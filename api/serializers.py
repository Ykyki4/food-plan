from rest_framework import serializers
 
from .models import Tag
 
class TagSerializer(serializers.ModelSerializer):
 
    # create a meta class
    class Meta:
        model = Tag
        fields = ('id', 'title',)