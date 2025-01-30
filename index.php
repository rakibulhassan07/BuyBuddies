<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");


error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection
$connection = new mysqli('localhost', 'root', '', 'BuyBuddies');
function updateDailyStats($connection, $quantity, $price) {
    $today = date('Y-m-d');
    // insert new record for today
    $sql = "INSERT INTO daily_orders (date, total_orders, total_quantity, total_price) 
            VALUES ('$today', 1, $quantity, $price) 
            ON DUPLICATE KEY UPDATE 
            total_orders = total_orders + 1,
            total_quantity = total_quantity + $quantity,
            total_price = total_price + $price";
    
    return $connection->query($sql);
}
// Check the connection
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

// Get the request method and URL path
$requestMethod = $_SERVER['REQUEST_METHOD'];
$requestUri = explode('/', trim($_SERVER['REQUEST_URI'], '/')); // Split the URL path into segments
$entity = $requestUri[3] ?? null; // This will be 'users', 'product', or 'order'

if ($entity === 'users') {
    if (isset($requestUri[4])) {
        $action = $requestUri[4];
        
        if ($action === 'seller-request' && $requestMethod === 'POST') {
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (isset($data['userId'], $data['role'])) {
                $userId = $connection->real_escape_string($data['userId']);
                $role = $connection->real_escape_string($data['role']);
                
                $sql = "UPDATE users SET role = '$role' WHERE id = '$userId'";
                
                if ($connection->query($sql) === TRUE) {
                    echo json_encode(["message" => "Seller request submitted successfully"]);
                } else {
                    echo json_encode(["error" => "Error updating user role"]);
                }
            } else {
                echo json_encode(["error" => "Invalid input"]);
            }
        }
        elseif ($action === 'update-role' && $requestMethod === 'POST') {
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (isset($data['userId'], $data['role'])) {
                $userId = $connection->real_escape_string($data['userId']);
                $role = $connection->real_escape_string($data['role']);
                
                $sql = "UPDATE users SET role = '$role' WHERE id = '$userId'";
                
                if ($connection->query($sql) === TRUE) {
                    echo json_encode(["message" => "User role updated successfully"]);
                } else {
                    echo json_encode(["error" => "Error updating user role"]);
                }
            } else {
                echo json_encode(["error" => "Invalid input"]);
            }
        }
    } else {
        if ($requestMethod === 'GET') {
           
            $sql = "SELECT * FROM users";
            $result = $connection->query($sql);

            if ($result->num_rows > 0) {
                $users = [];
                while ($row = $result->fetch_assoc()) {
                    $users[] = [
                        "id" => $row['id'],
                        "email" => $row['email'],
                        "name" => $row['name'],
                        "password" => $row['password'],
                        "role" => $row['role'],
                    ];
                }
                echo json_encode($users);
            } else {
                echo json_encode([]);
            }
        }
        elseif ($requestMethod === 'POST') {
          
            $data = json_decode(file_get_contents('php://input'), true);

            if (isset($data['name'], $data['photo'], $data['email'], $data['password'], $data['role'])) {
         
                $name = $connection->real_escape_string($data['name']);
                $photo = $connection->real_escape_string($data['photo']);
                $email = $connection->real_escape_string($data['email']);
                $password = $connection->real_escape_string($data['password']);
                $role = $connection->real_escape_string($data['role']);
                
           
                $sql = "INSERT INTO users (name, photo, email, password, role) 
                    VALUES ('$name', '$photo', '$email', '$password', '$role')";

                if ($connection->query($sql) === TRUE) {
                    echo json_encode(["message" => "User added successfully!"]);
                } else {
                    echo json_encode(["error" => "Error: " . $sql . "<br>" . $connection->error]);
                }
            } else {
                echo json_encode(["error" => "Invalid input: Please provide all required fields."]);
            }
        }
    }
}
elseif ($entity === 'daily-stats') {
    if ($requestMethod === 'GET') {
     
        $startDate = $_GET['start_date'] ?? date('Y-m-d', strtotime('-7 days'));
        $endDate = $_GET['end_date'] ?? date('Y-m-d');
        
        $sql = "SELECT date, total_orders, total_quantity, total_price 
                FROM daily_orders 
                WHERE date BETWEEN '$startDate' AND '$endDate'
                ORDER BY date ASC";
        
        $result = $connection->query($sql);
        $stats = [];
        
        while ($row = $result->fetch_assoc()) {
            $stats[] = [
                'date' => $row['date'],
                'orders' => (int)$row['total_orders'],
                'quantity' => (int)$row['total_quantity'],
                'price' => (float)$row['total_price']
            ];
        }
        
        echo json_encode($stats);
    }
}
elseif ($entity === 'product') {
    
    if ($requestMethod === 'GET') {
       
        $sql = "SELECT * FROM product";
        $result = $connection->query($sql);

        if ($result->num_rows > 0) {
            $products = [];
            while ($row = $result->fetch_assoc()) {
                $products[] = [
                    "id" => $row['id'],
                    "product_photo" => $row['product_photo'],
                    "product_name" => $row['product_name'],
                    "product_price" => $row['product_price'],
                    "product_details" => $row['product_details'],
                    "product_quantity" => $row['product_quantity'],
                    "user_id" => $row['user_id'],
                ];
            }
            echo json_encode($products);
        } else {
            echo json_encode([]);
        }
    }
    elseif ($requestMethod === 'POST') {
        
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['product_photo'], $data['product_name'], $data['product_price'], $data['product_details'], $data['product_quantity'],$data['user_id'])) {
          
            $product_photo = $connection->real_escape_string($data['product_photo']);
            $product_name = $connection->real_escape_string($data['product_name']);
            $product_price = $connection->real_escape_string($data['product_price']);
            $product_details = $connection->real_escape_string($data['product_details']);
            $product_quantity = $connection->real_escape_string($data['product_quantity']);
            $user_id = $connection->real_escape_string($data['user_id']);

     
            $sql = "INSERT INTO product (product_photo, product_name, product_price, product_details, product_quantity, user_id) 
                VALUES ('$product_photo', '$product_name', '$product_price', '$product_details', '$product_quantity', '$user_id')";

            if ($connection->query($sql) === TRUE) {
                echo json_encode(["message" => "Product added successfully!"]);
            } else {
                echo json_encode(["error" => "Error adding product: " . $connection->error]);
            }
        } else {
            echo json_encode(["error" => "Invalid input: Please provide all required fields."]);
        }
    }
    elseif ($requestMethod === 'DELETE') {
        $productId = $requestUri[4] ?? null;

        if ($productId) {
      
            $connection->begin_transaction();

            try {
            
                $getOrderSql = "SELECT * FROM product WHERE id ='$productId'";
                $orderResult = $connection->query($getOrderSql);
                
                if ($orderResult && $orderResult->num_rows > 0) {
                    $orderData = $orderResult->fetch_assoc();
                    
               
                   
                    $deleteSql = "DELETE FROM product WHERE id ='$productId'";
                    $connection->query($deleteSql);

                  
                    $connection->commit();
                    echo json_encode(["message" => "Producy delete successfully"]);
                } else {
                    echo json_encode(["error" => "product not found"]);
                }
            } catch (Exception $e) {
                
                $connection->rollback();
                echo json_encode(["error" => "Error cancelling product: " . $e->getMessage()]);
            }
        }
         else {
            echo json_encode(["error" => "product Id is required"]);
        }
    }

elseif ($requestMethod === 'PUT') {
    $productId = $requestUri[4] ?? null;

    if ($productId) {
        $data = json_decode(file_get_contents('php://input'), true);

       
        if (isset($data['product_price']) || isset($data['product_quantity'])) {
            $updateFields = [];

           
            if (isset($data['product_price'])) {
                $product_price = $connection->real_escape_string($data['product_price']);
                $updateFields[] = "product_price = '$product_price'";
            }

            if (isset($data['product_quantity'])) {
                $product_quantity = $connection->real_escape_string($data['product_quantity']);
                $updateFields[] = "product_quantity = '$product_quantity'";
            }

            $updateQuery = "UPDATE product SET " . implode(', ', $updateFields) . " WHERE id = '$productId'";

          
            if ($connection->query($updateQuery) === TRUE) {
                echo json_encode([
                    "message" => "Product updated successfully!", 
                    "product_id" => $productId
                ]);
            } else {
                echo json_encode([
                    "error" => "Error updating product: " . $connection->error
                ]);
            }
        } else {
            echo json_encode([
                "error" => "No update fields provided"
            ]);
        }
    } else {
        echo json_encode([
            "error" => "Product ID is required"
        ]);
    }
}
}


elseif ($entity === 'payment') {
    if ($requestMethod === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['user_id'], $data['payment_method'], $data['order_price'], $data['product_id'])) {
          
            $connection->begin_transaction();

            try {
     
                $user_id = $connection->real_escape_string($data['user_id']);
                $payment_method = $connection->real_escape_string($data['payment_method']);
                $order_price = $connection->real_escape_string($data['order_price']);
                $product_id = $connection->real_escape_string($data['product_id']);
                
        
                $sql = "INSERT INTO payment (user_id, payment_method, order_price, product_id) 
                        VALUES ('$user_id', '$payment_method', '$order_price', '$product_id')";

                if ($connection->query($sql) === TRUE) {
                    
                    $connection->commit();
                    echo json_encode([
                        "message" => "Payment processed successfully!", 
                        "payment_id" => $connection->insert_id
                    ]);
                } else {
                    throw new Exception($connection->error);
                }
            } catch (Exception $e) {
                
                $connection->rollback();
                echo json_encode(["error" => "Error processing payment: " . $e->getMessage()]);
            }
        } else {
            echo json_encode(["error" => "Invalid input: Please provide all required payment fields (user_id, payment_method, order_price, product_id)."]);
        }
    } else {
        echo json_encode(["error" => "Invalid request method. Only POST is allowed."]);
    }
}
elseif ($entity === 'order') {
    if ($requestMethod === 'GET') {

        $sql = "SELECT o.*, u.email as user_email 
        FROM `order` o
        JOIN users u ON o.user_id = u.id";
        $result = $connection->query($sql);

        if ($result->num_rows > 0) {
            $orders = [];
            while ($row = $result->fetch_assoc()) {
                $orders[] = [
                    "id" => $row['id'],
                    "user_id" => $row['user_id'],
                    "user_email" => $row['user_email'], 
                    "product_id" => $row['product_id'],
                    "address" => $row['address'],
                    "quantity" => $row['quantity'],
                    "price" => $row['price'],
                    "status" => $row['status'],
                    "product_photo" => $row['product_photo'],
                    "product_name" => $row['product_name'],
                ];
            }
            echo json_encode($orders);
        } else {
            echo json_encode([]);
        }
    }
    elseif ($requestMethod === 'POST') {
        $orderId = $requestUri[4] ?? null;
        
        
        if ($orderId) {
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (isset($data['status'])) {
               
                $status = $connection->real_escape_string($data['status']);
                
               
                $sql = "UPDATE `order` SET status = '$status' WHERE id = '$orderId'";
                
                if ($connection->query($sql) === TRUE) {
                    echo json_encode(["message" => "Order status updated successfully"]);
                } else {
                    echo json_encode(["error" => "Error updating order status: " . $connection->error]);
                }
            } else {
                echo json_encode(["error" => "Status is required"]);
            }
        } else {
            
            $data = json_decode(file_get_contents('php://input'), true);

            if (isset($data['user_id'], $data['product_id'], $data['address'], $data['quantity'], $data['price'], $data['status'], $data['product_photo'], $data['product_name'])) {
              
                $user_id = $connection->real_escape_string($data['user_id']);
                $product_id = $connection->real_escape_string($data['product_id']);
                $address = $connection->real_escape_string($data['address']);
                $quantity = $connection->real_escape_string($data['quantity']);
                $price = $connection->real_escape_string($data['price']);
                $status = $connection->real_escape_string($data['status']);
                $product_photo = $connection->real_escape_string($data['product_photo']);
                $product_name = $connection->real_escape_string($data['product_name']);

               
                $connection->begin_transaction();

                try {

                    $sql = "INSERT INTO `order` (user_id, product_id, address, quantity, price, status, product_photo, product_name) 
                    VALUES ('$user_id', '$product_id', '$address', '$quantity', '$price', '$status', '$product_photo', '$product_name')";
                    
                    $connection->query($sql);
                    updateDailyStats($connection, $quantity, $price);
                    echo json_encode(["message" => "Order placed successfully!"]);
                   
                    $update_quantity = "UPDATE product 
                        SET product_quantity = product_quantity - '$quantity' 
                        WHERE id = '$product_id'";
                    
                    $connection->query($update_quantity);

               
                    $connection->commit();
                    echo json_encode(["message" => "Order placed successfully!"]);
                } catch (Exception $e) {
               
                    $connection->rollback();
                    echo json_encode(["error" => "Error processing order: " . $e->getMessage()]);
                }
            } else {
                echo json_encode(["error" => "Invalid input: Please provide all required fields."]);
            }
        }
    } 
    elseif ($requestMethod === 'DELETE') {
      
        $orderId = $requestUri[4] ?? null;
      
        if ($orderId) {
        
            $connection->begin_transaction();

            try {
                
                $getOrderSql = "SELECT product_id, quantity FROM `order` WHERE id = '$orderId'";
                $orderResult = $connection->query($getOrderSql);
                
                if ($orderResult && $orderResult->num_rows > 0) {
                    $orderData = $orderResult->fetch_assoc();
                    
                    $updateQuantitySql = "UPDATE product 
                        SET product_quantity = product_quantity + '{$orderData['quantity']}'
                        WHERE id = '{$orderData['product_id']}'";
                    $connection->query($updateQuantitySql);
                    
                   
                    $deleteSql = "DELETE FROM `order` WHERE id = '$orderId'";
                    $connection->query($deleteSql);

                    $connection->commit();
                    echo json_encode(["message" => "Order cancelled successfully"]);
                } else {
                    echo json_encode(["error" => "Order not found"]);
                }
            } catch (Exception $e) {
              
                $connection->rollback();
                echo json_encode(["error" => "Error cancelling order: " . $e->getMessage()]);
            }
        }
         else {
            echo json_encode(["error" => "Order ID is required"]);
        }
    }
}
elseif ($entity === 'reviews') {
    if ($requestMethod === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['order_id'], $data['product_id'], $data['rating'], $data['comment'])) {
            $connection->begin_transaction();

            try {
                $order_id = $connection->real_escape_string($data['order_id']);
                $product_id = $connection->real_escape_string($data['product_id']);
                $rating = $connection->real_escape_string($data['rating']);
                $comment = $connection->real_escape_string($data['comment']);

                // Insert review
                $sql = "INSERT INTO reviews (order_id, product_id, rating, comment) 
                        VALUES ('$order_id', '$product_id', '$rating', '$comment')";

                if ($connection->query($sql) === TRUE) {
                    // Update order to mark as reviewed
                    $updateOrderSql = "UPDATE `order` SET reviewed = 1 WHERE id = '$order_id'";
                    $connection->query($updateOrderSql);

                    $connection->commit();
                    echo json_encode(["message" => "Review submitted successfully!"]);
                } else {
                    throw new Exception($connection->error);
                }
            } catch (Exception $e) {
                $connection->rollback();
                echo json_encode(["error" => "Error submitting review: " . $e->getMessage()]);
            }
        } else {
            echo json_encode(["error" => "Invalid input: Please provide all required review fields."]);
        }
    }
    if ($requestMethod === 'GET') {
       
        $sql = "SELECT * FROM reviews";
        $result = $connection->query($sql);

        if ($result->num_rows > 0) {
            $products = [];
            while ($row = $result->fetch_assoc()) {
                $products[] = [
                    "id" => $row['id'],
                    "order_id" => $row['order_id'],
                    "product_id" => $row['product_id'],
                    "rating" => $row['rating'],
                    "comment" => $row['comment'],
                    
                ];
            }
            echo json_encode($products);
        } else {
            echo json_encode([]);
        }
    }

}
else {
    
    header("HTTP/1.1 404 Not Found");
    echo json_encode(["error" => "Invalid endpoint"]);
}


$connection->close();
?>