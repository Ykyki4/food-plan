from django.db import models
from django.contrib.auth.models import AbstractBaseUser


class User(AbstractBaseUser):
    telegram_id = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=50)
    phone = models.CharField(max_length=20)
    is_manager = models.BooleanField(default=False)
    is_premium = models.BooleanField(default=False)

    USERNAME_FIELD = 'telegram_id'


class Tag(models.Model):
    title = models.CharField(max_length=200)
    
    class Meta:
        verbose_name = 'Тэг'
        verbose_name_plural = 'Тэги'

    def __str__(self):
        return self.title


class Dish(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    picture = models.ImageField(upload_to="dish-pictures", blank=True, null=True)
    recommended = models.BooleanField('В рекомендациях', default=False)
    views = models.PositiveIntegerField('Просмотры', default=0)
    tag = models.ForeignKey(
                        Tag, 
                        on_delete=models.CASCADE,
                        verbose_name='Тэги',
                        related_name='dishes',
                        null=True,
                        blank=True
                    )

    class Meta:
        verbose_name = 'Блюдо'
        verbose_name_plural = 'Блюда'

    def __str__(self):
        return self.title


class DishStep(models.Model):
    dish = models.ForeignKey(Dish, on_delete=models.CASCADE)
    order = models.IntegerField()
    picture = models.ImageField(upload_to="dishstep-pictures", blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    
    class Meta:
        verbose_name = 'Шаг приготовление блюда'
        verbose_name_plural = 'Шаги приготовления блюда'


class Product(models.Model):
    title = models.CharField(max_length=200)
    
    class Meta:
        verbose_name = 'Продукт'
        verbose_name_plural = 'Продукты'

    def __str__(self):
        return self.title


class DishProduct(models.Model):
    dish = models.ForeignKey(Dish, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    amount = models.CharField(max_length=200)
    
    class Meta:
        verbose_name = 'Продукт блюда'
        verbose_name_plural = 'Продукты блюда'


class UserDish(models.Model):
    dish = models.ForeignKey(Dish, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    liked = models.BooleanField(default=False)
    disliked = models.BooleanField(default=False)
    shown_date_time = models.DateTimeField(auto_now_add=True)
