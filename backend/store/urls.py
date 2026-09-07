from django.urls import path
from .import views

urlpatterns=[
    path('products/',views.get_product),
    path('categories/',views.get_categories,name='get_categories'),
]