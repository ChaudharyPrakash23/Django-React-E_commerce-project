from rest_framework.response import Response
from .models import Category,Product,Cart,Cartitem
from rest_framework.decorators import api_view,permission_classes
from .serializers import ProductSerializer,CategorySerializer,CartSerializer,CartItemSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import status
from django.contrib.auth.models import User

@api_view(['GET'])
def get_products(request):
    products=Product.objects.all()
    serializer=ProductSerializer(products,many=True)
    return Response (serializer.data)

@api_view(['GET'])
def get_product(request,pk):    
    try:
        product=Product.objects.get(id=pk)
        serializer=ProductSerializer(product,context={'request':request})
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({'error':"product not found"},status=404)


@api_view(['GET'])
def get_categories(request):
    categories=Category.objects.all()
    serializer=CategorySerializer(categories,many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    cart,created=Cart.objects.get_or_create(user=request.user)
    serializer=CartSerializer(cart)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    product_id = request.data.get('product_id')
    product = Product.objects.get(id=product_id)
    cart, created = Cart.objects.get_or_create(user=request.user)
    item, created = Cartitem.objects.get_or_create(cart=cart, product=product)
    if not created:
        item.quantity += 1
        item.save()
    return Response({'message': 'product added to cart', 'cart': CartSerializer(cart).data})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):
    item_id=request.data.get('item_id')
    Cartitem.objects.filter(id=item_id).delete()
    return Response({'message':'Item removed from cart'})

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_cart_quantity(request):
    item_id = request.data.get('item_id') or request.data.get('id')
    quantity = request.data.get('quantity')

    if item_id is None or quantity is None:
        return Response({'error': 'Item ID and quantity are required'}, status=400)

    try:
        quantity = int(quantity)
    except (TypeError, ValueError):
        return Response({'error': 'Quantity must be a valid number'}, status=400)

    try:
        item = Cartitem.objects.get(id=item_id)
    except Cartitem.DoesNotExist:
        return Response({'error': 'Cart item is not found'}, status=404)

    if quantity < 1:
        item.delete()
        return Response({'message': 'Item removed from cart'}, status=200)

    item.quantity = quantity
    item.save()

    serializer = CartSerializer(item.cart)
    return Response(serializer.data)