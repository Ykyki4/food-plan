from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializers import TagSerializer
 
from .models import Tag
 
class TagView(ModelViewSet):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()
