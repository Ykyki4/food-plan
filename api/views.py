from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.response import Response

from .serializers import TagSerializer, TagDetailSerializer, DishSerializer, DishDetailSerializer
from .models import Tag, Dish
 
class TagView(ViewSet):
    def list(self, request):
        queryset = Tag.objects.all()
        serializer = TagSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        queryset = Tag.objects.all()
        dish = get_object_or_404(queryset, id=pk)
        serializer = TagSerializer(dish)
        return Response(serializer.data)
    

class DishView(ViewSet):
    def list(self, request):
        queryset = Dish.objects.all()
        serializer = DishSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        queryset = Dish.objects.all()
        dish = get_object_or_404(queryset, id=pk)
        serializer = DishDetailSerializer(dish)
        return Response(serializer.data)
    