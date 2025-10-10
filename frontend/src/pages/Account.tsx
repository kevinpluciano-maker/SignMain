import SEO from "@/components/SEO";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Package, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import ImprovedNavigation from "@/components/ImprovedNavigation";
import ImprovedFooter from "@/components/ImprovedFooter";

interface Order {
  id: string;
  date: string;
  status: 'Placed' | 'Processing' | 'Shipped' | 'Delivered';
  total: string;
  items: Array<{
    name: string;
    quantity: number;
    price: string;
  }>;
}

const Account = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Mock orders data - in real app this would come from API
  const [orders] = useState<Order[]>([
    {
      id: 'BSG-20241215-001',
      date: '2024-12-15',
      status: 'Delivered',
      total: '$156.00',
      items: [
        { name: 'Staff ADA Sign', quantity: 2, price: '$58.00' },
        { name: 'Restroom Sign', quantity: 1, price: '$40.00' }
      ]
    },
    {
      id: 'BSG-20241210-002', 
      date: '2024-12-10',
      status: 'Shipped',
      total: '$89.00',
      items: [
        { name: 'Door Number Sign', quantity: 1, price: '$89.00' }
      ]
    },
    {
      id: 'BSG-20241205-003',
      date: '2024-12-05', 
      status: 'Processing',
      total: '$234.00',
      items: [
        { name: 'Custom Office Signs', quantity: 3, price: '$78.00' }
      ]
    }
  ]);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Placed': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <SEO
        title="My Account | Bsign Store"
        description="Manage your account, view order history, and track your signage orders."
        canonical="/account"
        type="website"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <ImprovedNavigation />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">My Account</h1>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>

            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Profile Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Name</label>
                      <p className="text-lg">{user?.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <p className="text-lg">{user?.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Account Type</label>
                      <Badge variant={user?.role === 'admin' ? 'default' : 'secondary'} className="ml-2">
                        {user?.role === 'admin' ? 'Administrator' : 'Customer'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="orders" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Order History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {orders.length === 0 ? (
                      <div className="text-center py-8">
                        <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No orders yet</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <Card key={order.id} className="border">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-4">
                                <div>
                                  <h3 className="font-semibold">Order {order.id}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    Placed on {new Date(order.date).toLocaleDateString()}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <Badge className={getStatusColor(order.status)}>
                                    {order.status}
                                  </Badge>
                                  <p className="text-lg font-semibold mt-1">{order.total}</p>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                {order.items.map((item, index) => (
                                  <div key={index} className="flex justify-between text-sm">
                                    <span>{item.name} × {item.quantity}</span>
                                    <span>{item.price}</span>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <ImprovedFooter />
      </div>
    </>
  );
};

export default Account;