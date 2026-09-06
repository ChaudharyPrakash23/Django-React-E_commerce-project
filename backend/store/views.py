from django.shortcuts import render
from django.http import JsonResponse

def home(request):
    data={
        'message':'welcome to ecommerce-store'
    }
    return JsonResponse(data)