# Generated by Django 4.2.6 on 2024-05-18 11:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('halls', '0005_hall_slug'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='hall',
            name='slug',
        ),
    ]
