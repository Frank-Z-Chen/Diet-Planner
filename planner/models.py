# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin, BaseUserManager

class Food(models.Model):
    foodid = models.CharField(db_column='foodId', primary_key=True, max_length=30)  # Field name made lowercase.
    foodname = models.CharField(db_column='foodName', max_length=30, blank=True, null=True)  # Field name made lowercase.
    fat = models.FloatField(blank=True, null=True)
    protein = models.FloatField(blank=True, null=True)
    carb = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Food'


class Goalmadebyuser(models.Model):
    goalid = models.CharField(db_column='goalId', primary_key=True, max_length=30)  # Field name made lowercase.
    userid = models.ForeignKey('User', models.DO_NOTHING, db_column='userId', blank=True, null=True)  # Field name made lowercase.
    fat = models.FloatField(blank=True, null=True)
    protein = models.FloatField(blank=True, null=True)
    carb = models.FloatField(blank=True, null=True)
    calories = models.FloatField(blank=True, null=True)
    startdate = models.DateField(db_column='startDate', blank=True, null=True)  # Field name made lowercase.
    enddate = models.DateField(db_column='endDate', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'GoalMadeByUser'


class Recipe(models.Model):
    recipeid = models.CharField(db_column='recipeId', primary_key=True, max_length=30)  # Field name made lowercase.
    recipename = models.CharField(db_column='recipeName', max_length=30, blank=True, null=True)  # Field name made lowercase.
    userid = models.CharField(db_column='userId', max_length=30, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Recipe'


class CustomAccountManager(BaseUserManager):
    def create_superuser(self, email, age, gender, password, username, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)
        return self.create_user(email, age, gender, password, username, **other_fields)    
    
    
    
    def create_user(self, email, age, gender, password, username, **other_fields):
        email = self.normalize_email(email)
        user = self.model(email=email, age=age, gender=gender, username=username, **other_fields)
        user.set_password(password)
        user.save()
        return user



class User(AbstractUser, PermissionsMixin):
    userid = models.CharField(db_column='userId', primary_key=True, max_length=30)  # Field name made lowercase.
    email = models.CharField(unique=True, max_length=255, blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)
    gender = models.CharField(max_length=10, blank=True, null=True)
    password = models.CharField(max_length=255, blank=True, null=True)
    username = models.CharField(db_column='userName', max_length=30, blank=True, null=True)  # Field name made lowercase.

    objects= CustomAccountManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'password', 'age', 'gender']

    def __str__(self):
        return self.username

    class Meta:
        managed = True
        db_table = 'User'


class Weeklyplan(models.Model):
    planid = models.CharField(db_column='planID', primary_key=True, max_length=30)  # Field name made lowercase.
    createuserid = models.CharField(db_column='createUserId', max_length=30, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'WeeklyPlan'


class Contains(models.Model):
    planid = models.OneToOneField(Weeklyplan, models.DO_NOTHING, db_column='planId', primary_key=True)  # Field name made lowercase.
    recipeid = models.ForeignKey(Recipe, models.DO_NOTHING, db_column='recipeId')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'contains'
        unique_together = (('planid', 'recipeid'),)


class Createrecipe(models.Model):
    userid = models.OneToOneField(User, models.DO_NOTHING, db_column='userId', primary_key=True)  # Field name made lowercase.
    recipeid = models.ForeignKey(Recipe, models.DO_NOTHING, db_column='recipeId')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'createRecipe'
        unique_together = (('userid', 'recipeid'),)


class Decide(models.Model):
    userid = models.OneToOneField(User, models.DO_NOTHING, db_column='userId', primary_key=True)  # Field name made lowercase.
    planid = models.ForeignKey(Weeklyplan, models.DO_NOTHING, db_column='planId')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'decide'
        unique_together = (('userid', 'planid'),)


class Usefood(models.Model):
    recipeid = models.OneToOneField(Recipe, models.DO_NOTHING, db_column='recipeId', primary_key=True)  # Field name made lowercase.
    foodid = models.ForeignKey(Food, models.DO_NOTHING, db_column='foodId')  # Field name made lowercase.
    weight = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'useFood'
        unique_together = (('recipeid', 'foodid'),)
