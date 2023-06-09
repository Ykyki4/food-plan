# Generated by Django 4.1.1 on 2023-02-16 08:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_dish_recommended'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='dish',
            options={'verbose_name': 'Блюдо', 'verbose_name_plural': 'Блюда'},
        ),
        migrations.AlterModelOptions(
            name='dishproduct',
            options={'verbose_name': 'Продукт блюда', 'verbose_name_plural': 'Продукты блюда'},
        ),
        migrations.AlterModelOptions(
            name='dishstep',
            options={'verbose_name': 'Шаг приготовление блюда', 'verbose_name_plural': 'Шаги приготовления блюда'},
        ),
        migrations.AlterModelOptions(
            name='product',
            options={'verbose_name': 'Продукт', 'verbose_name_plural': 'Продукты'},
        ),
        migrations.AlterModelOptions(
            name='tag',
            options={'verbose_name': 'Тэг', 'verbose_name_plural': 'Тэги'},
        ),
        migrations.AddField(
            model_name='dish',
            name='views',
            field=models.PositiveIntegerField(default=0, verbose_name='Просмотры'),
        ),
    ]
