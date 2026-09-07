from rest_framework.response import Response
from .models import Category,Product
from rest_framework.decorators import api_view
from .serializers import ProductSerializer,CategorySerializer

@api_view(['GET'])
def get_product(request):
    products=Product.objects.all()
    serializer=ProductSerializer(products,many=True)
    return Response (serializer.data)

@api_view(['GET'])
def get_categories(request):
    categories=Category.objects.all()
    serializer=CategorySerializer(categories,many=True)
    return Response(serializer.data)