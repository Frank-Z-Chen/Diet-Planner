# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.db import connection
from django.contrib.auth.models import AbstractUser, PermissionsMixin, BaseUserManager

class Food(models.Model):
    foodid = models.IntegerField(db_column='foodId', primary_key=True)  # Field name made lowercase.
    foodname = models.CharField(db_column='foodName', max_length=30)  # Field name made lowercase.
    fat = models.FloatField(blank=True, null=True)
    protein = models.FloatField(blank=True, null=True)
    carb = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Food'


class Goalmadebyuser(models.Model):
    goalid = models.IntegerField(db_column='goalId', primary_key=True)  # Field name made lowercase.
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
    recipeid = models.IntegerField(db_column='recipeId', primary_key=True)  # Field name made lowercase.
    recipename = models.CharField(db_column='recipeName', max_length=255, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Recipe'


class Usefood(models.Model):
    recipeid = models.OneToOneField(Recipe, models.DO_NOTHING, db_column='recipeId', primary_key=True)  # Field name made lowercase.
    foodid = models.ForeignKey(Food, models.DO_NOTHING, db_column='foodId')  # Field name made lowercase.
    weight = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'UseFood'
        unique_together = (('recipeid', 'foodid'),)

class CustomAccountManager(BaseUserManager):

    def create_user(self, email, username, password, age, gender, is_superuser=False):
        email = self.normalize_email(email)
        user = self.model(email=self.normalize_email(email), username=username, age=age, gender=gender)
        user.set_password(password)
        user.superuser = is_superuser
        user.save(using=self._db)
        return user


    def create_superuser(self, email, username, password, age, gender):
        user = self.create_user(email, username, password, age, gender, is_superuser=True)
        return user   


class User(AbstractUser, PermissionsMixin):
    userid = models.IntegerField(db_column='userId', primary_key=True)  # Field name made lowercase.
    username = models.CharField(db_column='userName', max_length=255, blank=True, null=True)  # Field name made lowercase.
    email = models.CharField(unique=True, max_length=255, blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)
    gender = models.CharField(max_length=10, blank=True, null=True)
    password = models.CharField(max_length=255, blank=True, null=True)
    superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'password', 'age', 'gender']

    objects= CustomAccountManager()

    @property
    def is_staff(self):
        return self.superuser

    @property
    def is_superuser(self):
        return self.superuser
    
    class Meta:
        managed = True
        db_table = 'User'


class Weeklyplan(models.Model):
    planid = models.IntegerField(db_column='planID', primary_key=True)  # Field name made lowercase.
    creatuserid = models.IntegerField(db_column='creatUserId', blank=True, null=True)  # Field name made lowercase.
    createusername = models.CharField(db_column='createUserName', max_length=255, blank=True, null=True)  # Field name made lowercase.

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
