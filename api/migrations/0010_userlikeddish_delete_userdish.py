# Generated by Django 4.1.1 on 2023-03-14 06:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_alter_user_phone'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserLikedDish',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dish', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_liked_dishes', to='api.dish', verbose_name='Блюдо')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_liked_dishes', to='api.user', verbose_name='Пользователь')),
            ],
        ),
        migrations.DeleteModel(
            name='UserDish',
        ),
    ]
