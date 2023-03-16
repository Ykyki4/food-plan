from rest_framework import serializers
from django.http import HttpResponseRedirect
 
from .models import Tag, Dish, DishProduct, DishStep, User, UserLikedDish


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
        
        
class UserLikedDishSerializer(serializers.ModelSerializer):
    dish = DishSerializer(many=False, allow_null=True)
    
    class Meta:
        model = UserLikedDish
        fields = ("id", "dish")
        
        
class UserSerializer(serializers.ModelSerializer):
    user_liked_dishes = UserLikedDishSerializer(many=True)
        
    class Meta:
        model = User
        fields = ("id", "name", "phone", "user_liked_dishes",)
    

class UserRegisterSerializer(serializers.ModelSerializer):

    def create(self, validated_data):

        user = User.objects.create_user(
            phone=validated_data['phone'],
            name=validated_data['name'],
            password=validated_data['password'],
        )

        return user

    class Meta:
        model = User
        fields = ("id", "name", "phone", "password",)