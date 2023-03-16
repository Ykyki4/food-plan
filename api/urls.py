from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import TagView, DishView, UserRegisterView, UserDetailView, \
    UserLoginView, UpdateDishViews, AddDishToUser

router = DefaultRouter()

router.register(r'tags', TagView, 'tag')
router.register(r'dishes', DishView, 'dish')

urlpatterns = [
    path('', include(router.urls)),
    path('update-dish-views/<int:id>', UpdateDishViews.as_view(), name="update-dish-views"),
    path('register/', UserRegisterView.as_view(), name="register"),
    path('login/', UserLoginView.as_view(), name="login"),
    path('user/<int:id>', UserDetailView.as_view(), name="user-detail"),
    path('add-user-dish/', AddDishToUser.as_view(), name="add-user-dish")
]