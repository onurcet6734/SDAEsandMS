# Generated by Django 4.2.6 on 2024-05-18 10:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schedulings', '0008_alter_scheduling_hallid'),
    ]

    operations = [
        migrations.AddField(
            model_name='scheduling',
            name='slug',
            field=models.SlugField(blank=True, null=True, unique=True),
        ),
    ]
