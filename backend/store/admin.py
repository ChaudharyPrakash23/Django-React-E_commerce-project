from django.contrib import admin
from .models import Category,Order,Product,OrderItem,UserProfile

# Register your models here.
admin.site.register(Category)
admin.site.register(Order)
admin.site.register(Product)
admin.site.register(OrderItem)
admin.site.register(UserProfile)
