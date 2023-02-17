from django.contrib import admin
from .models import User, Dish, DishStep, Product, DishProduct, UserDish, Tag


class DishStepInline(admin.TabularInline):
    model = DishStep


class DishProductsInline(admin.TabularInline):
    model = DishProduct


@admin.register(Dish)
class DishAdmin(admin.ModelAdmin):
    list_display = ('title', 'views', 'recommended', 'tag')
    list_editable = ('recommended', 'tag')
    list_filter = ('recommended', 'tag')
    ordering = ('-views',)
    inlines = [
        DishStepInline,
        DishProductsInline,
    ]
    

admin.site.register(User)
admin.site.register(DishStep)
admin.site.register(Product)
admin.site.register(DishProduct)
admin.site.register(UserDish)
admin.site.register(Tag)
