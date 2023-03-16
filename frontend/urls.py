from django.urls import path

from frontend.views import index

urlpatterns = [
    path('', index, name='index'),
    path('dishes/', index, name='dishes'),
    path('dish/<int:id>', index, name='dish'),
    path('tag/<int:id>', index, name='tag'),
    path('recommended/', index, name='recommended'),
    path('user-dishes/', index, name='user-dishes'),
]