# Generated by Django 5.0.3 on 2024-03-18 10:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_apprenticeshipstandard_rename_react_userinfo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userinfo',
            name='userName',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]
