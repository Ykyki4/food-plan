from django.contrib import admin
from .models import User, Dish, DishStep, Product, DishProduct, UserDish, Tag


class DishStepInline(admin.TabularInline):
    model = DishStep


class DishProductsInline(admin.TabularInline):
    model = DishProduct


class DishAdmin(admin.ModelAdmin):
    inlines = [
        DishStepInline,
        DishProductsInline,
    ]

admin.site.register(User)
admin.site.register(Dish, DishAdmin)
admin.site.register(DishStep)
admin.site.register(Product)
admin.site.register(DishProduct)
admin.site.register(UserDish)
admin.site.register(Tag)
