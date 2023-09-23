# Triveous-Ecommerce-backend
   - It is an ecommerce site backend developed as a part of Triveous company assignment.
# API  
  # user:
     - register: it can be used to register an user based on the user data provided.
     - login ; it is used to login users. If a user is registered he can easily login and all other routes are only accessible by authorized users
  # product: 
      - addproduct: This route is used to add product to the database which can be later accessed accordingly.
      - getproduct: This route is used to get product and details of each product.
      - getproductbyID: This route is used to get a single product based on the id.
      - deleteproduct: This route can be used to delete product
  # cart:
      - addToCart: this route can be used to add items to the cart based on the id provided
      - getCartItem: This route can be used to access the cart items and get it or display it
      - increaseQuantity: This can be used to increase the cart item quantity based on the id
      - decreaseQuantity: This can be used to decrease the cart item quantity based on the id
      - removeItem:This can be used to remove the cart item based on the id 
# HOW TO USE THE BACKEND: type npm i in the cli for it
