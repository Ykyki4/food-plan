from rest_framework import serializers
 
from .models import Tag, Dish
 
 
class TagSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Tag
        fields = ('id', 'title')
        

class DishSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Dish
        fields = ('id', 'recommended', 'title', 'description', 'tag', 'picture', 'views')