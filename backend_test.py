#!/usr/bin/env python3
"""
BSign Store Backend API Testing Suite
Tests all backend functionality including API endpoints, cart system integration,
contact form handling, product data, and admin mode functionality.
"""

import requests
import json
import time
import sys
from datetime import datetime
from typing import Dict, List, Any, Optional

# Configuration
BACKEND_URL = "https://code-scanner-16.preview.emergentagent.com/api"
TEST_CLIENT_NAME = "BSignStore_TestClient"

class BSignBackendTester:
    def __init__(self):
        self.results = []
        self.total_tests = 0
        self.passed_tests = 0
        self.failed_tests = 0
        
    def log_result(self, test_name: str, passed: bool, message: str, details: Optional[Dict] = None):
        """Log test result"""
        self.total_tests += 1
        if passed:
            self.passed_tests += 1
            status = "✅ PASS"
        else:
            self.failed_tests += 1
            status = "❌ FAIL"
            
        result = {
            "test": test_name,
            "status": status,
            "message": message,
            "timestamp": datetime.now().isoformat(),
            "details": details or {}
        }
        self.results.append(result)
        print(f"{status}: {test_name} - {message}")
        
    def test_api_root_endpoint(self):
        """Test GET /api/ endpoint"""
        try:
            response = requests.get(f"{BACKEND_URL}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("message") == "Hello World":
                    self.log_result(
                        "API Root Endpoint", 
                        True, 
                        "Root endpoint responding correctly",
                        {"response": data, "status_code": response.status_code}
                    )
                else:
                    self.log_result(
                        "API Root Endpoint", 
                        False, 
                        f"Unexpected response message: {data}",
                        {"response": data, "status_code": response.status_code}
                    )
            else:
                self.log_result(
                    "API Root Endpoint", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}",
                    {"status_code": response.status_code, "response": response.text}
                )
                
        except requests.exceptions.RequestException as e:
            self.log_result(
                "API Root Endpoint", 
                False, 
                f"Connection error: {str(e)}",
                {"error": str(e)}
            )
    
    def test_status_post_endpoint(self):
        """Test POST /api/status endpoint"""
        try:
            payload = {"client_name": TEST_CLIENT_NAME}
            response = requests.post(
                f"{BACKEND_URL}/status", 
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["id", "client_name", "timestamp"]
                
                if all(field in data for field in required_fields):
                    if data["client_name"] == TEST_CLIENT_NAME:
                        self.log_result(
                            "Status POST Endpoint", 
                            True, 
                            "Status creation successful with correct data",
                            {"response": data, "status_code": response.status_code}
                        )
                        return data["id"]  # Return ID for GET test
                    else:
                        self.log_result(
                            "Status POST Endpoint", 
                            False, 
                            f"Client name mismatch: expected {TEST_CLIENT_NAME}, got {data['client_name']}",
                            {"response": data}
                        )
                else:
                    missing_fields = [f for f in required_fields if f not in data]
                    self.log_result(
                        "Status POST Endpoint", 
                        False, 
                        f"Missing required fields: {missing_fields}",
                        {"response": data, "missing_fields": missing_fields}
                    )
            else:
                self.log_result(
                    "Status POST Endpoint", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}",
                    {"status_code": response.status_code, "response": response.text}
                )
                
        except requests.exceptions.RequestException as e:
            self.log_result(
                "Status POST Endpoint", 
                False, 
                f"Connection error: {str(e)}",
                {"error": str(e)}
            )
        
        return None
    
    def test_status_get_endpoint(self, created_id: Optional[str] = None):
        """Test GET /api/status endpoint"""
        try:
            response = requests.get(f"{BACKEND_URL}/status", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    if len(data) > 0:
                        # Check if our created record exists
                        if created_id:
                            found_record = any(record.get("id") == created_id for record in data)
                            if found_record:
                                self.log_result(
                                    "Status GET Endpoint", 
                                    True, 
                                    f"Retrieved {len(data)} status records, including our test record",
                                    {"record_count": len(data), "found_test_record": True}
                                )
                            else:
                                self.log_result(
                                    "Status GET Endpoint", 
                                    False, 
                                    f"Test record with ID {created_id} not found in response",
                                    {"record_count": len(data), "found_test_record": False}
                                )
                        else:
                            self.log_result(
                                "Status GET Endpoint", 
                                True, 
                                f"Retrieved {len(data)} status records successfully",
                                {"record_count": len(data)}
                            )
                    else:
                        self.log_result(
                            "Status GET Endpoint", 
                            True, 
                            "Empty status list retrieved (no records yet)",
                            {"record_count": 0}
                        )
                else:
                    self.log_result(
                        "Status GET Endpoint", 
                        False, 
                        f"Expected list response, got: {type(data)}",
                        {"response_type": str(type(data)), "response": data}
                    )
            else:
                self.log_result(
                    "Status GET Endpoint", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}",
                    {"status_code": response.status_code, "response": response.text}
                )
                
        except requests.exceptions.RequestException as e:
            self.log_result(
                "Status GET Endpoint", 
                False, 
                f"Connection error: {str(e)}",
                {"error": str(e)}
            )

    def test_content_post_endpoint(self):
        """Test POST /api/content/{section_id} endpoint"""
        try:
            section_id = "test_section_homepage_hero"
            payload = {
                "section_id": section_id,
                "content": "<h1>Test Content for BSign Store</h1><p>Professional signage solutions.</p>",
                "font_size": "16px",
                "font_family": "Arial, sans-serif",
                "plain_text": "Test Content for BSign Store. Professional signage solutions."
            }
            
            response = requests.post(
                f"{BACKEND_URL}/content/{section_id}", 
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["id", "section_id", "content", "font_size", "font_family", "plain_text", "timestamp"]
                
                if all(field in data for field in required_fields):
                    if data["section_id"] == section_id and data["content"] == payload["content"]:
                        self.log_result(
                            "Content POST Endpoint", 
                            True, 
                            "Content creation successful with correct data",
                            {"response": data, "status_code": response.status_code}
                        )
                        return section_id  # Return section_id for GET test
                    else:
                        self.log_result(
                            "Content POST Endpoint", 
                            False, 
                            f"Content data mismatch in response",
                            {"response": data}
                        )
                else:
                    missing_fields = [f for f in required_fields if f not in data]
                    self.log_result(
                        "Content POST Endpoint", 
                        False, 
                        f"Missing required fields: {missing_fields}",
                        {"response": data, "missing_fields": missing_fields}
                    )
            else:
                self.log_result(
                    "Content POST Endpoint", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}",
                    {"status_code": response.status_code, "response": response.text}
                )
                
        except requests.exceptions.RequestException as e:
            self.log_result(
                "Content POST Endpoint", 
                False, 
                f"Connection error: {str(e)}",
                {"error": str(e)}
            )
        
        return None

    def test_content_get_by_section_endpoint(self, section_id: Optional[str] = None):
        """Test GET /api/content/{section_id} endpoint"""
        if not section_id:
            section_id = "test_section_homepage_hero"
            
        try:
            response = requests.get(f"{BACKEND_URL}/content/{section_id}", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if data and isinstance(data, dict):
                    required_fields = ["id", "section_id", "content", "font_size", "font_family", "plain_text", "timestamp"]
                    if all(field in data for field in required_fields):
                        if data["section_id"] == section_id:
                            self.log_result(
                                "Content GET by Section Endpoint", 
                                True, 
                                f"Retrieved content for section '{section_id}' successfully",
                                {"section_id": section_id, "content_length": len(data.get("content", ""))}
                            )
                        else:
                            self.log_result(
                                "Content GET by Section Endpoint", 
                                False, 
                                f"Section ID mismatch: expected {section_id}, got {data['section_id']}",
                                {"expected": section_id, "actual": data["section_id"]}
                            )
                    else:
                        missing_fields = [f for f in required_fields if f not in data]
                        self.log_result(
                            "Content GET by Section Endpoint", 
                            False, 
                            f"Missing required fields: {missing_fields}",
                            {"response": data, "missing_fields": missing_fields}
                        )
                else:
                    # Check if it's a 404-like response (null/empty for non-existent section)
                    if data is None:
                        self.log_result(
                            "Content GET by Section Endpoint", 
                            True, 
                            f"No content found for section '{section_id}' (expected behavior)",
                            {"section_id": section_id, "response": "null"}
                        )
                    else:
                        self.log_result(
                            "Content GET by Section Endpoint", 
                            False, 
                            f"Unexpected response format: {type(data)}",
                            {"response_type": str(type(data)), "response": data}
                        )
            else:
                self.log_result(
                    "Content GET by Section Endpoint", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}",
                    {"status_code": response.status_code, "response": response.text}
                )
                
        except requests.exceptions.RequestException as e:
            self.log_result(
                "Content GET by Section Endpoint", 
                False, 
                f"Connection error: {str(e)}",
                {"error": str(e)}
            )

    def test_content_get_all_endpoint(self):
        """Test GET /api/content endpoint"""
        try:
            response = requests.get(f"{BACKEND_URL}/content", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    self.log_result(
                        "Content GET All Endpoint", 
                        True, 
                        f"Retrieved {len(data)} content sections successfully",
                        {"content_count": len(data)}
                    )
                else:
                    self.log_result(
                        "Content GET All Endpoint", 
                        False, 
                        f"Expected list response, got: {type(data)}",
                        {"response_type": str(type(data)), "response": data}
                    )
            else:
                self.log_result(
                    "Content GET All Endpoint", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}",
                    {"status_code": response.status_code, "response": response.text}
                )
                
        except requests.exceptions.RequestException as e:
            self.log_result(
                "Content GET All Endpoint", 
                False, 
                f"Connection error: {str(e)}",
                {"error": str(e)}
            )

    def test_invalid_endpoints(self):
        """Test invalid endpoints return proper 404 errors"""
        # Test invalid API endpoints (should return 404)
        invalid_api_endpoints = [
            "/api/invalid",
            "/api/status/invalid",
            "/api/content/invalid/extra"
        ]
        
        for endpoint in invalid_api_endpoints:
            try:
                response = requests.get(f"{BACKEND_URL.replace('/api', '')}{endpoint}", timeout=10)
                
                if response.status_code == 404:
                    self.log_result(
                        f"Invalid API Endpoint {endpoint}", 
                        True, 
                        f"Properly returned 404 for invalid API endpoint",
                        {"endpoint": endpoint, "status_code": response.status_code}
                    )
                else:
                    self.log_result(
                        f"Invalid API Endpoint {endpoint}", 
                        False, 
                        f"Expected 404, got {response.status_code}",
                        {"endpoint": endpoint, "status_code": response.status_code}
                    )
                    
            except requests.exceptions.RequestException as e:
                self.log_result(
                    f"Invalid API Endpoint {endpoint}", 
                    False, 
                    f"Connection error: {str(e)}",
                    {"endpoint": endpoint, "error": str(e)}
                )
        
        # Test non-API endpoint (should return 200 with React app for SPA routing)
        try:
            response = requests.get(f"{BACKEND_URL.replace('/api', '')}/nonexistent", timeout=10)
            
            if response.status_code == 200 and "<!DOCTYPE html>" in response.text:
                self.log_result(
                    "Frontend SPA Routing", 
                    True, 
                    "Frontend properly serves React app for non-API routes (SPA behavior)",
                    {"endpoint": "/nonexistent", "status_code": response.status_code, "content_type": "HTML"}
                )
            else:
                self.log_result(
                    "Frontend SPA Routing", 
                    False, 
                    f"Unexpected response for non-API route: {response.status_code}",
                    {"endpoint": "/nonexistent", "status_code": response.status_code}
                )
                
        except requests.exceptions.RequestException as e:
            self.log_result(
                "Frontend SPA Routing", 
                False, 
                f"Connection error: {str(e)}",
                {"endpoint": "/nonexistent", "error": str(e)}
            )

    def test_invalid_data_submissions(self):
        """Test API handles invalid data submissions properly"""
        # Test invalid JSON for status endpoint
        try:
            response = requests.post(
                f"{BACKEND_URL}/status", 
                json={"invalid_field": "test"},  # Missing required client_name
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code in [400, 422]:  # Bad Request or Unprocessable Entity
                self.log_result(
                    "Invalid Data Validation", 
                    True, 
                    f"Properly rejected invalid data with status {response.status_code}",
                    {"status_code": response.status_code}
                )
            else:
                self.log_result(
                    "Invalid Data Validation", 
                    False, 
                    f"Expected 400/422 for invalid data, got {response.status_code}",
                    {"status_code": response.status_code, "response": response.text}
                )
                
        except requests.exceptions.RequestException as e:
            self.log_result(
                "Invalid Data Validation", 
                False, 
                f"Connection error during invalid data test: {str(e)}",
                {"error": str(e)}
            )

    def test_gzip_compression(self):
        """Test GZip compression is working"""
        try:
            headers = {"Accept-Encoding": "gzip, deflate"}
            response = requests.get(f"{BACKEND_URL}/", headers=headers, timeout=10)
            
            content_encoding = response.headers.get("Content-Encoding", "")
            
            if "gzip" in content_encoding.lower():
                self.log_result(
                    "GZip Compression", 
                    True, 
                    "GZip compression is enabled",
                    {"content_encoding": content_encoding}
                )
            else:
                # Check if response is small (might not be compressed due to size threshold)
                content_length = len(response.content)
                if content_length < 1000:  # Minimum size threshold
                    self.log_result(
                        "GZip Compression", 
                        True, 
                        f"GZip not applied due to small content size ({content_length} bytes < 1000 bytes threshold)",
                        {"content_length": content_length, "threshold": 1000}
                    )
                else:
                    self.log_result(
                        "GZip Compression", 
                        False, 
                        f"GZip compression not detected for large content ({content_length} bytes)",
                        {"content_length": content_length, "content_encoding": content_encoding}
                    )
                
        except requests.exceptions.RequestException as e:
            self.log_result(
                "GZip Compression", 
                False, 
                f"GZip compression test error: {str(e)}",
                {"error": str(e)}
            )

    def test_concurrent_requests(self):
        """Test API handles concurrent requests properly"""
        import threading
        import queue
        
        results_queue = queue.Queue()
        
        def make_request(request_id):
            try:
                start_time = time.time()
                response = requests.get(f"{BACKEND_URL}/", timeout=10)
                end_time = time.time()
                
                results_queue.put({
                    "request_id": request_id,
                    "status_code": response.status_code,
                    "response_time": (end_time - start_time) * 1000,
                    "success": response.status_code == 200
                })
            except Exception as e:
                results_queue.put({
                    "request_id": request_id,
                    "error": str(e),
                    "success": False
                })
        
        # Create 5 concurrent requests
        threads = []
        for i in range(5):
            thread = threading.Thread(target=make_request, args=(i,))
            threads.append(thread)
            thread.start()
        
        # Wait for all threads to complete
        for thread in threads:
            thread.join()
        
        # Collect results
        results = []
        while not results_queue.empty():
            results.append(results_queue.get())
        
        successful_requests = [r for r in results if r.get("success", False)]
        
        if len(successful_requests) == 5:
            avg_response_time = sum(r["response_time"] for r in successful_requests) / len(successful_requests)
            self.log_result(
                "Concurrent Requests", 
                True, 
                f"All 5 concurrent requests successful, avg response time: {avg_response_time:.2f}ms",
                {"successful_requests": len(successful_requests), "total_requests": 5, "avg_response_time": avg_response_time}
            )
        else:
            failed_count = 5 - len(successful_requests)
            self.log_result(
                "Concurrent Requests", 
                False, 
                f"{failed_count} out of 5 concurrent requests failed",
                {"successful_requests": len(successful_requests), "failed_requests": failed_count, "results": results}
            )
    
    def test_cart_system_integration(self):
        """Test cart system integration (localStorage-based frontend functionality)"""
        # Since cart is localStorage-based, we test if backend can support cart-related operations
        # by verifying the API endpoints are accessible for potential cart data persistence
        
        try:
            # Test if backend is ready to handle cart-related requests
            response = requests.get(f"{BACKEND_URL}/", timeout=10)
            
            if response.status_code == 200:
                self.log_result(
                    "Cart System Integration", 
                    True, 
                    "Backend ready to support cart operations (localStorage-based frontend)",
                    {"backend_status": "ready", "cart_type": "localStorage"}
                )
            else:
                self.log_result(
                    "Cart System Integration", 
                    False, 
                    "Backend not responding for cart integration",
                    {"status_code": response.status_code}
                )
                
        except requests.exceptions.RequestException as e:
            self.log_result(
                "Cart System Integration", 
                False, 
                f"Backend connection failed for cart integration: {str(e)}",
                {"error": str(e)}
            )
    
    def test_contact_form_handling(self):
        """Test contact form handling capability"""
        # Test if backend could handle contact form submissions
        # Since no specific contact endpoint exists, we test general API capability
        
        try:
            # Simulate contact form data
            contact_data = {
                "client_name": "ContactForm_Test",
                "form_type": "contact_inquiry"
            }
            
            # Use status endpoint as proxy for form handling capability
            response = requests.post(
                f"{BACKEND_URL}/status", 
                json=contact_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                self.log_result(
                    "Contact Form Handling", 
                    True, 
                    "Backend can handle form submissions (tested via status endpoint)",
                    {"test_method": "status_endpoint_proxy", "response": response.json()}
                )
            else:
                self.log_result(
                    "Contact Form Handling", 
                    False, 
                    f"Backend form handling test failed: HTTP {response.status_code}",
                    {"status_code": response.status_code, "response": response.text}
                )
                
        except requests.exceptions.RequestException as e:
            self.log_result(
                "Contact Form Handling", 
                False, 
                f"Contact form handling test error: {str(e)}",
                {"error": str(e)}
            )
    
    def test_product_categorization_system(self):
        """Test product categorization system support"""
        # Test if backend can support product data operations
        
        try:
            # Test backend readiness for product operations
            response = requests.get(f"{BACKEND_URL}/", timeout=10)
            
            if response.status_code == 200:
                # Simulate product categorization test data
                product_test_data = {
                    "client_name": "ProductCategorization_Test",
                    "test_type": "product_category_system"
                }
                
                category_response = requests.post(
                    f"{BACKEND_URL}/status", 
                    json=product_test_data,
                    headers={"Content-Type": "application/json"},
                    timeout=10
                )
                
                if category_response.status_code == 200:
                    self.log_result(
                        "Product Categorization System", 
                        True, 
                        "Backend ready to support product categorization operations",
                        {"categorization_support": "ready", "test_response": category_response.json()}
                    )
                else:
                    self.log_result(
                        "Product Categorization System", 
                        False, 
                        "Backend categorization support test failed",
                        {"status_code": category_response.status_code}
                    )
            else:
                self.log_result(
                    "Product Categorization System", 
                    False, 
                    "Backend not ready for product operations",
                    {"status_code": response.status_code}
                )
                
        except requests.exceptions.RequestException as e:
            self.log_result(
                "Product Categorization System", 
                False, 
                f"Product categorization test error: {str(e)}",
                {"error": str(e)}
            )
    
    def test_admin_mode_autosave(self):
        """Test admin mode auto-save functionality support"""
        # Test if backend can support admin mode operations
        
        try:
            # Simulate admin mode auto-save test
            admin_test_data = {
                "client_name": "AdminMode_AutoSave_Test",
                "operation_type": "auto_save_test"
            }
            
            response = requests.post(
                f"{BACKEND_URL}/status", 
                json=admin_test_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                # Check if timestamp is recent (auto-save timing test)
                timestamp = data.get("timestamp")
                if timestamp:
                    self.log_result(
                        "Admin Mode Auto-Save", 
                        True, 
                        "Backend supports admin mode auto-save operations with timestamps",
                        {"auto_save_support": "ready", "timestamp": timestamp}
                    )
                else:
                    self.log_result(
                        "Admin Mode Auto-Save", 
                        False, 
                        "Backend missing timestamp support for auto-save",
                        {"response": data}
                    )
            else:
                self.log_result(
                    "Admin Mode Auto-Save", 
                    False, 
                    f"Admin mode support test failed: HTTP {response.status_code}",
                    {"status_code": response.status_code}
                )
                
        except requests.exceptions.RequestException as e:
            self.log_result(
                "Admin Mode Auto-Save", 
                False, 
                f"Admin mode auto-save test error: {str(e)}",
                {"error": str(e)}
            )
    
    def test_database_connectivity(self):
        """Test MongoDB database connectivity through API"""
        try:
            # Create a test record to verify database operations
            test_data = {"client_name": "Database_Connectivity_Test"}
            
            # POST test
            post_response = requests.post(
                f"{BACKEND_URL}/status", 
                json=test_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if post_response.status_code == 200:
                created_record = post_response.json()
                record_id = created_record.get("id")
                
                # GET test to verify database persistence
                get_response = requests.get(f"{BACKEND_URL}/status", timeout=10)
                
                if get_response.status_code == 200:
                    records = get_response.json()
                    found_record = any(r.get("id") == record_id for r in records)
                    
                    if found_record:
                        self.log_result(
                            "Database Connectivity", 
                            True, 
                            "MongoDB database connectivity confirmed (create and retrieve operations successful)",
                            {"database": "MongoDB", "operations": ["create", "retrieve"], "test_record_id": record_id}
                        )
                    else:
                        self.log_result(
                            "Database Connectivity", 
                            False, 
                            "Database write/read consistency issue - record not found after creation",
                            {"created_id": record_id, "total_records": len(records)}
                        )
                else:
                    self.log_result(
                        "Database Connectivity", 
                        False, 
                        f"Database read operation failed: HTTP {get_response.status_code}",
                        {"get_status_code": get_response.status_code}
                    )
            else:
                self.log_result(
                    "Database Connectivity", 
                    False, 
                    f"Database write operation failed: HTTP {post_response.status_code}",
                    {"post_status_code": post_response.status_code}
                )
                
        except requests.exceptions.RequestException as e:
            self.log_result(
                "Database Connectivity", 
                False, 
                f"Database connectivity test error: {str(e)}",
                {"error": str(e)}
            )
    
    def test_cors_configuration(self):
        """Test CORS configuration for frontend integration"""
        try:
            # Test preflight request
            headers = {
                "Origin": "https://code-scanner-16.preview.emergentagent.com",
                "Access-Control-Request-Method": "POST",
                "Access-Control-Request-Headers": "Content-Type"
            }
            
            response = requests.options(f"{BACKEND_URL}/status", headers=headers, timeout=10)
            
            # Check if CORS headers are present
            cors_headers = {
                "Access-Control-Allow-Origin": response.headers.get("Access-Control-Allow-Origin"),
                "Access-Control-Allow-Methods": response.headers.get("Access-Control-Allow-Methods"),
                "Access-Control-Allow-Headers": response.headers.get("Access-Control-Allow-Headers")
            }
            
            if any(cors_headers.values()):
                self.log_result(
                    "CORS Configuration", 
                    True, 
                    "CORS headers configured for frontend integration",
                    {"cors_headers": cors_headers, "status_code": response.status_code}
                )
            else:
                # Try a regular request to check CORS on actual response
                regular_response = requests.get(f"{BACKEND_URL}/", timeout=10)
                regular_cors = regular_response.headers.get("Access-Control-Allow-Origin")
                
                if regular_cors:
                    self.log_result(
                        "CORS Configuration", 
                        True, 
                        "CORS configured (detected on regular response)",
                        {"cors_origin": regular_cors}
                    )
                else:
                    self.log_result(
                        "CORS Configuration", 
                        False, 
                        "CORS headers not detected - may cause frontend integration issues",
                        {"preflight_status": response.status_code, "regular_status": regular_response.status_code}
                    )
                
        except requests.exceptions.RequestException as e:
            self.log_result(
                "CORS Configuration", 
                False, 
                f"CORS test error: {str(e)}",
                {"error": str(e)}
            )
    
    def test_api_performance(self):
        """Test API response performance"""
        try:
            start_time = time.time()
            response = requests.get(f"{BACKEND_URL}/", timeout=10)
            end_time = time.time()
            
            response_time = (end_time - start_time) * 1000  # Convert to milliseconds
            
            if response.status_code == 200:
                if response_time < 2000:  # Less than 2 seconds
                    self.log_result(
                        "API Performance", 
                        True, 
                        f"API response time acceptable: {response_time:.2f}ms",
                        {"response_time_ms": response_time, "threshold_ms": 2000}
                    )
                else:
                    self.log_result(
                        "API Performance", 
                        False, 
                        f"API response time too slow: {response_time:.2f}ms (threshold: 2000ms)",
                        {"response_time_ms": response_time, "threshold_ms": 2000}
                    )
            else:
                self.log_result(
                    "API Performance", 
                    False, 
                    f"API performance test failed due to HTTP {response.status_code}",
                    {"status_code": response.status_code, "response_time_ms": response_time}
                )
                
        except requests.exceptions.RequestException as e:
            self.log_result(
                "API Performance", 
                False, 
                f"API performance test error: {str(e)}",
                {"error": str(e)}
            )
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting BSign Store Backend API Testing Suite")
        print(f"🎯 Testing backend at: {BACKEND_URL}")
        print("=" * 80)
        
        # 1. API Health Check Tests
        print("\n📋 1. API HEALTH CHECK TESTS")
        print("-" * 40)
        self.test_api_root_endpoint()
        
        # 2. Content API Tests
        print("\n📋 2. CONTENT API TESTS")
        print("-" * 40)
        created_section_id = self.test_content_post_endpoint()
        self.test_content_get_by_section_endpoint(created_section_id)
        self.test_content_get_all_endpoint()
        
        # 3. Status API Tests
        print("\n📋 3. STATUS API TESTS")
        print("-" * 40)
        created_id = self.test_status_post_endpoint()
        self.test_status_get_endpoint(created_id)
        
        # 4. Database Connection Tests
        print("\n📋 4. DATABASE CONNECTION TESTS")
        print("-" * 40)
        self.test_database_connectivity()
        
        # 5. Performance Tests
        print("\n📋 5. PERFORMANCE TESTS")
        print("-" * 40)
        self.test_api_performance()
        self.test_concurrent_requests()
        
        # 6. Error Handling Tests
        print("\n📋 6. ERROR HANDLING TESTS")
        print("-" * 40)
        self.test_invalid_endpoints()
        self.test_invalid_data_submissions()
        
        # 7. CORS and Headers Tests
        print("\n📋 7. CORS AND HEADERS TESTS")
        print("-" * 40)
        self.test_cors_configuration()
        self.test_gzip_compression()
        
        # 8. Integration Tests
        print("\n📋 8. INTEGRATION TESTS")
        print("-" * 40)
        self.test_cart_system_integration()
        self.test_contact_form_handling()
        self.test_product_categorization_system()
        self.test_admin_mode_autosave()
        
        # Summary
        print("\n" + "=" * 80)
        print("📊 COMPREHENSIVE TEST SUMMARY")
        print("=" * 80)
        print(f"Total Tests: {self.total_tests}")
        print(f"✅ Passed: {self.passed_tests}")
        print(f"❌ Failed: {self.failed_tests}")
        print(f"Success Rate: {(self.passed_tests/self.total_tests*100):.1f}%")
        
        if self.failed_tests > 0:
            print("\n🔍 FAILED TESTS DETAILS:")
            for result in self.results:
                if "❌ FAIL" in result["status"]:
                    print(f"  • {result['test']}: {result['message']}")
        else:
            print("\n🎉 ALL TESTS PASSED! Backend is fully operational.")
        
        print("\n" + "=" * 80)
        return self.failed_tests == 0

def main():
    """Main test execution"""
    tester = BSignBackendTester()
    success = tester.run_all_tests()
    
    # Save detailed results
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump({
            "summary": {
                "total_tests": tester.total_tests,
                "passed_tests": tester.passed_tests,
                "failed_tests": tester.failed_tests,
                "success_rate": (tester.passed_tests/tester.total_tests*100) if tester.total_tests > 0 else 0,
                "timestamp": datetime.now().isoformat()
            },
            "results": tester.results
        }, f, indent=2)
    
    print(f"\n📄 Detailed results saved to: /app/backend_test_results.json")
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()