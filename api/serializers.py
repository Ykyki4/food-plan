from rest_framework import serializers
 
from .models import Tag, Dish, DishProduct, DishStep


class DishProductSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField('get_product_title')
    
    def get_product_title(self, obj):
        return obj.product.title
    
    class Meta:
        model = DishProduct
        fields = ('id', 'title', 'amount')


class DishStepSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = DishStep
        fields = ('id', 'order', 'picture', 'description')


class DishDetailSerializer(serializers.ModelSerializer):
    dish_products = DishProductSerializer(many=True)
    steps = DishStepSerializer(many=True)

    class Meta:
        model = Dish
        fields = ('id', 'recommended', 'title', 'description', 'dish_products', 'steps', 'tag', 'picture', 'views')
        

class DishSerializer(serializers.ModelSerializer):

    class Meta:
        model = Dish
        fields = ('id', 'recommended', 'title', 'description', 'tag', 'picture', 'views')

        
class TagSerializer(serializers.ModelSerializer):
    dishes = DishSerializer(many=True)
 
    class Meta:
        model = Tag
        fields = ('id', 'title', 'dishes')
        

class TagDetailSerializer(serializers.ModelSerializer):
    dishes = DishDetailSerializer(many=True)
 
    class Meta:
        model = Tag
        fields = ('id', 'title', 'dishes')