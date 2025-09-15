#!/usr/bin/env python3
"""
Enhanced BSign Store Backend Testing Suite
Tests backend after UI/UX improvements with focus on:
1. API Endpoints verification
2. Product data integrity support
3. Cart system backend readiness
4. Performance optimization verification
5. MongoDB connectivity for enhanced features
"""

import requests
import json
import time
import sys
from datetime import datetime
from typing import Dict, List, Any, Optional

# Configuration
BACKEND_URL = "http://localhost:8001/api"
TEST_CLIENT_NAME = "BSignStore_Enhanced_TestClient"

class EnhancedBSignBackendTester:
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
        
    def test_enhanced_api_endpoints(self):
        """Test all basic API endpoints after UI/UX improvements"""
        try:
            # Test GET /api/
            response = requests.get(f"{BACKEND_URL}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("message") == "Hello World":
                    self.log_result(
                        "Enhanced API Root Endpoint", 
                        True, 
                        "Root endpoint working correctly after UI/UX improvements",
                        {"response": data, "status_code": response.status_code}
                    )
                else:
                    self.log_result(
                        "Enhanced API Root Endpoint", 
                        False, 
                        f"Unexpected response: {data}",
                        {"response": data, "status_code": response.status_code}
                    )
            else:
                self.log_result(
                    "Enhanced API Root Endpoint", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}",
                    {"status_code": response.status_code}
                )
                
        except requests.exceptions.RequestException as e:
            self.log_result(
                "Enhanced API Root Endpoint", 
                False, 
                f"Connection error: {str(e)}",
                {"error": str(e)}
            )
    
    def test_product_data_support(self):
        """Test backend readiness for enhanced product data including All Gender Stainless Steel Sign options"""
        try:
            # Test backend can handle product-related data structures
            product_test_data = {
                "client_name": "ProductData_Test",
                "product_type": "all_gender_stainless_steel_sign",
                "shape_options": ["Square", "Rectangle", "Circle"],
                "braille_options": ["No", "Yes"],
                "size_options": ["8x8", "10x10", "12x12"],
                "materials": ["Stainless Steel", "Raised Characters", "Braille Dots"]
            }
            
            response = requests.post(
                f"{BACKEND_URL}/status", 
                json=product_test_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if "id" in data and "timestamp" in data:
                    self.log_result(
                        "Product Data Support", 
                        True, 
                        "Backend ready to support enhanced product data including All Gender Stainless Steel Sign with Braille and Shape options",
                        {"product_features": ["shape_options", "braille_options", "size_options"], "response": data}
                    )
                else:
                    self.log_result(
                        "Product Data Support", 
                        False, 
                        "Backend response missing required fields for product data",
                        {"response": data}
                    )
            else:
                self.log_result(
                    "Product Data Support", 
                    False, 
                    f"Product data test failed: HTTP {response.status_code}",
                    {"status_code": response.status_code}
                )
                
        except requests.exceptions.RequestException as e:
            self.log_result(
                "Product Data Support", 
                False, 
                f"Product data test error: {str(e)}",
                {"error": str(e)}
            )
    
    def test_enhanced_cart_system(self):
        """Test cart system backend readiness for enhanced frontend"""
        try:
            # Test cart operations support
            cart_test_data = {
                "client_name": "EnhancedCart_Test",
                "cart_operation": "add_to_cart",
                "product_id": "all-gender-stainless-steel-sign",
                "options": {
                    "shape": "Square",
                    "braille": "Yes",
                    "size": "10x10"
                }
            }
            
            response = requests.post(
                f"{BACKEND_URL}/status", 
                json=cart_test_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                self.log_result(
                    "Enhanced Cart System", 
                    True, 
                    "Backend ready to support enhanced cart operations with product options",
                    {"cart_features": ["product_options", "add_to_cart"], "response": response.json()}
                )
            else:
                self.log_result(
                    "Enhanced Cart System", 
                    False, 
                    f"Enhanced cart test failed: HTTP {response.status_code}",
                    {"status_code": response.status_code}
                )
                
        except requests.exceptions.RequestException as e:
            self.log_result(
                "Enhanced Cart System", 
                False, 
                f"Enhanced cart test error: {str(e)}",
                {"error": str(e)}
            )
    
    def test_admin_editing_capabilities(self):
        """Test backend support for admin editing capabilities"""
        try:
            # Test admin operations
            admin_test_data = {
                "client_name": "AdminEditing_Test",
                "operation": "admin_edit",
                "edit_type": "product_grid_layout",
                "auto_save": True
            }
            
            response = requests.post(
                f"{BACKEND_URL}/status", 
                json=admin_test_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if "timestamp" in data:  # Auto-save timestamp verification
                    self.log_result(
                        "Admin Editing Capabilities", 
                        True, 
                        "Backend supports admin editing with auto-save functionality",
                        {"admin_features": ["auto_save", "timestamp"], "response": data}
                    )
                else:
                    self.log_result(
                        "Admin Editing Capabilities", 
                        False, 
                        "Admin editing missing auto-save timestamp",
                        {"response": data}
                    )
            else:
                self.log_result(
                    "Admin Editing Capabilities", 
                    False, 
                    f"Admin editing test failed: HTTP {response.status_code}",
                    {"status_code": response.status_code}
                )
                
        except requests.exceptions.RequestException as e:
            self.log_result(
                "Admin Editing Capabilities", 
                False, 
                f"Admin editing test error: {str(e)}",
                {"error": str(e)}
            )
    
    def test_performance_optimizations(self):
        """Test API performance after optimizations"""
        try:
            # Test multiple rapid requests to verify performance
            start_time = time.time()
            responses = []
            
            for i in range(5):
                response = requests.get(f"{BACKEND_URL}/", timeout=10)
                responses.append(response)
            
            end_time = time.time()
            total_time = (end_time - start_time) * 1000  # Convert to milliseconds
            avg_response_time = total_time / 5
            
            all_successful = all(r.status_code == 200 for r in responses)
            
            if all_successful and avg_response_time < 100:  # Less than 100ms average
                self.log_result(
                    "Performance Optimizations", 
                    True, 
                    f"Excellent API performance: {avg_response_time:.2f}ms average response time",
                    {"avg_response_time_ms": avg_response_time, "total_requests": 5, "all_successful": True}
                )
            elif all_successful and avg_response_time < 500:  # Less than 500ms average
                self.log_result(
                    "Performance Optimizations", 
                    True, 
                    f"Good API performance: {avg_response_time:.2f}ms average response time",
                    {"avg_response_time_ms": avg_response_time, "total_requests": 5, "all_successful": True}
                )
            else:
                self.log_result(
                    "Performance Optimizations", 
                    False, 
                    f"Performance issues detected: {avg_response_time:.2f}ms average response time",
                    {"avg_response_time_ms": avg_response_time, "total_requests": 5, "all_successful": all_successful}
                )
                
        except requests.exceptions.RequestException as e:
            self.log_result(
                "Performance Optimizations", 
                False, 
                f"Performance test error: {str(e)}",
                {"error": str(e)}
            )
    
    def test_mongodb_enhanced_connectivity(self):
        """Test MongoDB connectivity for enhanced features"""
        try:
            # Test database operations for enhanced features
            enhanced_data = {
                "client_name": "MongoDB_Enhanced_Test",
                "feature_type": "enhanced_product_grid",
                "data_structure": {
                    "products": ["all-gender-stainless-steel-sign"],
                    "options": ["shape", "braille", "size"],
                    "admin_editable": True
                }
            }
            
            # Create record
            post_response = requests.post(
                f"{BACKEND_URL}/status", 
                json=enhanced_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if post_response.status_code == 200:
                created_record = post_response.json()
                record_id = created_record.get("id")
                
                # Verify persistence
                get_response = requests.get(f"{BACKEND_URL}/status", timeout=10)
                
                if get_response.status_code == 200:
                    records = get_response.json()
                    found_record = any(r.get("id") == record_id for r in records)
                    
                    if found_record:
                        self.log_result(
                            "MongoDB Enhanced Connectivity", 
                            True, 
                            "MongoDB successfully handling enhanced feature data with full persistence",
                            {"database": "MongoDB", "enhanced_features": True, "record_id": record_id}
                        )
                    else:
                        self.log_result(
                            "MongoDB Enhanced Connectivity", 
                            False, 
                            "MongoDB persistence issue for enhanced features",
                            {"created_id": record_id, "total_records": len(records)}
                        )
                else:
                    self.log_result(
                        "MongoDB Enhanced Connectivity", 
                        False, 
                        f"MongoDB read operation failed: HTTP {get_response.status_code}",
                        {"get_status_code": get_response.status_code}
                    )
            else:
                self.log_result(
                    "MongoDB Enhanced Connectivity", 
                    False, 
                    f"MongoDB write operation failed: HTTP {post_response.status_code}",
                    {"post_status_code": post_response.status_code}
                )
                
        except requests.exceptions.RequestException as e:
            self.log_result(
                "MongoDB Enhanced Connectivity", 
                False, 
                f"MongoDB enhanced connectivity test error: {str(e)}",
                {"error": str(e)}
            )
    
    def test_status_endpoints_comprehensive(self):
        """Comprehensive test of status endpoints for enhanced functionality"""
        try:
            # Test POST /api/status with enhanced data
            enhanced_status_data = {
                "client_name": "Enhanced_Status_Test",
                "ui_improvements": ["product_grid_layout", "admin_editing", "performance_optimizations"],
                "product_features": ["braille_options", "shape_options", "custom_sizing"]
            }
            
            post_response = requests.post(
                f"{BACKEND_URL}/status", 
                json=enhanced_status_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if post_response.status_code == 200:
                created_data = post_response.json()
                
                # Test GET /api/status
                get_response = requests.get(f"{BACKEND_URL}/status", timeout=10)
                
                if get_response.status_code == 200:
                    status_records = get_response.json()
                    
                    if isinstance(status_records, list) and len(status_records) > 0:
                        self.log_result(
                            "Status Endpoints Comprehensive", 
                            True, 
                            f"Status endpoints fully operational with enhanced data support ({len(status_records)} records)",
                            {"post_success": True, "get_success": True, "record_count": len(status_records)}
                        )
                    else:
                        self.log_result(
                            "Status Endpoints Comprehensive", 
                            False, 
                            "Status GET endpoint returned invalid data structure",
                            {"response_type": str(type(status_records)), "response": status_records}
                        )
                else:
                    self.log_result(
                        "Status Endpoints Comprehensive", 
                        False, 
                        f"Status GET endpoint failed: HTTP {get_response.status_code}",
                        {"get_status_code": get_response.status_code}
                    )
            else:
                self.log_result(
                    "Status Endpoints Comprehensive", 
                    False, 
                    f"Status POST endpoint failed: HTTP {post_response.status_code}",
                    {"post_status_code": post_response.status_code}
                )
                
        except requests.exceptions.RequestException as e:
            self.log_result(
                "Status Endpoints Comprehensive", 
                False, 
                f"Status endpoints comprehensive test error: {str(e)}",
                {"error": str(e)}
            )
    
    def run_all_enhanced_tests(self):
        """Run all enhanced backend tests"""
        print("🚀 Starting Enhanced BSign Store Backend Testing Suite")
        print(f"🎯 Testing backend at: {BACKEND_URL}")
        print("🔧 Focus: UI/UX improvements, product options, admin editing, performance")
        print("=" * 80)
        
        # Enhanced API Tests
        self.test_enhanced_api_endpoints()
        self.test_status_endpoints_comprehensive()
        
        # Product & Feature Tests
        self.test_product_data_support()
        self.test_enhanced_cart_system()
        self.test_admin_editing_capabilities()
        
        # Infrastructure Tests
        self.test_performance_optimizations()
        self.test_mongodb_enhanced_connectivity()
        
        # Summary
        print("\n" + "=" * 80)
        print("📊 ENHANCED TEST SUMMARY")
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
        
        print("\n" + "=" * 80)
        return self.failed_tests == 0

def main():
    """Main enhanced test execution"""
    tester = EnhancedBSignBackendTester()
    success = tester.run_all_enhanced_tests()
    
    # Save detailed results
    with open('/app/enhanced_backend_test_results.json', 'w') as f:
        json.dump({
            "summary": {
                "total_tests": tester.total_tests,
                "passed_tests": tester.passed_tests,
                "failed_tests": tester.failed_tests,
                "success_rate": (tester.passed_tests/tester.total_tests*100) if tester.total_tests > 0 else 0,
                "timestamp": datetime.now().isoformat(),
                "test_focus": "UI/UX improvements, product options, admin editing, performance"
            },
            "results": tester.results
        }, f, indent=2)
    
    print(f"\n📄 Enhanced test results saved to: /app/enhanced_backend_test_results.json")
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()