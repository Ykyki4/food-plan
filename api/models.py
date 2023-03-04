from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from phonenumber_field.modelfields import PhoneNumberField


class User(AbstractBaseUser):
    name = models.CharField('Имя', max_length=50)
    phone = PhoneNumberField('Номер телефона')
    is_premium = models.BooleanField('Премиум', default=False)
    
    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    def __str__(self):
        return self.phone


class Tag(models.Model):
    title = models.CharField('Название', max_length=200)
    
    class Meta:
        verbose_name = 'Тэг'
        verbose_name_plural = 'Тэги'

    def __str__(self):
        return self.title


class Dish(models.Model):
    title = models.CharField('Название', max_length=200)
    description = models.TextField('Описание', blank=True, null=True)
    picture = models.ImageField('Картинка', upload_to="dish-pictures", blank=True, null=True)
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
        ordering = ['-views']

    def __str__(self):
        return self.title


class DishStep(models.Model):
    dish = models.ForeignKey(Dish, verbose_name='Блюдо', related_name='steps', on_delete=models.CASCADE)
    order = models.IntegerField('Порядок')
    picture = models.ImageField('Картинка', upload_to="dishstep-pictures", blank=True, null=True)
    description = models.TextField('Описание', blank=True, null=True)
    
    class Meta:
        verbose_name = 'Шаг приготовление блюда'
        verbose_name_plural = 'Шаги приготовления блюда'


class Product(models.Model):
    title = models.CharField('Название', max_length=200)
    
    class Meta:
        verbose_name = 'Продукт'
        verbose_name_plural = 'Продукты'

    def __str__(self):
        return self.title


class DishProduct(models.Model):
    dish = models.ForeignKey(Dish, verbose_name='Блюдо', related_name='dish_products', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, verbose_name='Продукт', related_name='dish_products', on_delete=models.CASCADE)
    amount = models.CharField('Количество', max_length=200)
    
    class Meta:
        verbose_name = 'Продукт блюда'
        verbose_name_plural = 'Продукты блюда'


class UserDish(models.Model):
    dish = models.ForeignKey(Dish, verbose_name='Блюдо', related_name='user_dishes', on_delete=models.CASCADE)
    user = models.ForeignKey(User, verbose_name='Пользователь', related_name='user_dishes', on_delete=models.CASCADE)
    liked = models.BooleanField('Лайк', default=False)
