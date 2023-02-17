from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializers import TagSerializer, DishSerializer
 
from .models import Tag, Dish
 
class TagView(ModelViewSet):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()
    

class DishView(ModelViewSet):
    serializer_class = DishSerializer
    queryset = Dish.objects.all().order_by('-views')