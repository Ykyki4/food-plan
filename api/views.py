from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.response import Response

from .serializers import TagSerializer, DishSerializer
from .models import Tag, Dish
 
class TagView(ModelViewSet):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()
    

class DishView(ViewSet):
    def list(self, request):
        queryset = Dish.objects.all().order_by('-views')
        serializer = DishSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        queryset = Dish.objects.all()
        dish = get_object_or_404(queryset, id=pk)
        serializer = DishSerializer(dish)
        return Response(serializer.data)
    