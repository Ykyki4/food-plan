from django.shortcuts import get_object_or_404
from rest_framework import permissions, status
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView

from .serializers import TagSerializer, DishSerializer, DishDetailSerializer, \
    UserRegisterSerializer, UserSerializer, UserLikedDish
from .models import Tag, Dish, User
 
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
    

class UserRegisterView(CreateAPIView):
    model = User
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserRegisterSerializer
    

class UserDetailView(APIView):
  permission_classes = [
      permissions.AllowAny,
      ]
  def get(self, request, id, *args, **kwargs):
    user = User.objects.get(id=id)
    serializer = UserSerializer(user)
    return Response(serializer.data)


class UserLoginView(APIView):
    def post(self, request, format=None):
        data = request.data

        phone = data.get('phone', None)
        password = data.get('password', None)
        
        try:
            user = User.objects.get(phone=phone, password=password)
            return Response(UserSerializer(user).data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class UpdateDishViews(APIView):
    def get(self, request, id):
        dish = Dish.objects.get(id=id)
        dish.views += 1
        dish.save()
        return Response(DishSerializer(dish).data)
    
    
class AddDishToUser(APIView):
    def post(self, request, format=None):
        data = request.data

        user_id = data.get('user_id', None)
        dish_id = data.get('dish_id', None)
        
        try:
            dish = Dish.objects.get(id=dish_id)
            user = User.objects.get(id=user_id)
            
            UserLikedDish.objects.create(dish=dish, user=user)
            
            return Response(status=status.HTTP_200_OK)
        except User.DoesNotExist or Dish.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)