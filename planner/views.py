from django.db import connection
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from planner.models import *
from .serializers import FoodSerializer
from django.core.exceptions import ObjectDoesNotExist
import json 

def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]

@api_view(['GET','POST'])
def show_foods(request):
    try:
        if request.method == 'GET':
            qs = Food.objects.raw("SELECT * FROM Food")
            serializer = FoodSerializer(qs, many = True)
            if not serializer.data:
                raise Food.DoesNotExist
            return Response(serializer.data)
        elif request.method == 'POST':
            serializer = FoodSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            data=serializer.validated_data
            cursor = connection.cursor()
            cursor.execute("INSERT INTO Food VALUES(%s, %s, %s, %s, %s)", [data['foodid'], data['foodname'], data['fat'], data['protein'], data['carb']]) 
            #these 3 lines can be directly replaced by serializer.save()　
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    except Food.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET','PATCH', 'DELETE'])
def food_detail(request, id):
    cursor = connection.cursor()
    try:
        qs = Food.objects.raw("SELECT * FROM Food WHERE foodId = %s", [id])
        if request.method == 'GET':
            qs_json = FoodSerializer(qs, many = True).data
            if not qs_json:
                raise Food.DoesNotExist
            return Response(qs_json)
        elif request.method == 'PATCH':
            print(request.data)
            #food = get_object_or_404(Food, pk=id)
            # serializer = FoodSerializer(data=request.data)
            # serializer.is_valid()
            #serializer.save()
            # print(serializer.data)
            data=request.data#validated_data
            cursor.execute("UPDATE Food SET foodName = %s, fat = %s, protein = %s, carb = %s WHERE foodId = %s", [data['foodname'], data['fat'], data['protein'], data['carb'], data['foodid']]) 
            return Response(request.data, status=status.HTTP_200_OK)
        elif request.method == 'DELETE':
            
            cursor.execute("DELETE FROM Food WHERE foodId = %s", [id])
            return Response(status=status.HTTP_204_NO_CONTENT)
    except Food.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # try:
    #     food = Food.objects.get(pk=id)
    #     serializer = FoodSerializer(food)
    #     return Response(serializer.data)
    # except Food.DoesNotExist:
    #     return Response(status=404)

    


# @api_view()
# def show_food_detail(request, id):
#     cursor = connection.cursor()
#     cursor.execute("SELECT * FROM Food WHERE foodId = %s", [id])
#     r = dictfetchall(cursor)
    
#     return Response(r)

    # cursor = connection.cursor()
    # cursor.execute("SELECT * FROM Food WHERE foodId = %s", [id])
    # r = cursor.fetchone()
    # return Response(r)




@api_view(['PATCH'])
def avg_cal_for_diff_age_in_range(request):
    SQL = "SELECT age, avg(calories) AS Average_Kal FROM GoalMadeByUser NATURAL JOIN (Select age, userId From User WHERE gender = %s AND age <= %s AND age >= %s) AS temp GROUP BY age ORDER BY age;"
    try:
        if request.method == 'PATCH':
            print(request.data)
            # serializer = FoodSerializer(data=request.data)
            # serializer.is_valid()
            # data=serializer.data
            cursor = connection.cursor()
            data = request.data
            cursor.execute(SQL, [data['gender'], data['age_upperbound'], data['age_lowerbound']])
            r = dictfetchall(cursor)
            if not r:
                raise ObjectDoesNotExist
            return Response(r)
    except ObjectDoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['PATCH'])
def total_recipe_cal(request):
    SQL = """SELECT r.recipeName AS Recipe_Name, SUM(f.UnitKcal * u.weight) AS Total_Calories 
            FROM Recipe r NATURAL JOIN UseFood u JOIN (SELECT foodId, (fat*9+protein*4+carb*4) AS UnitKcal FROM Food) AS f ON u.foodId = f.foodId 
            WHERE r.recipeName = %s 
            GROUP BY u.recipeId;"""
    
    try:
        if request.method == 'PATCH':
            cursor = connection.cursor()
            data = request.data
            cursor.execute(SQL, [data['recipename']])
            r = dictfetchall(cursor)
            if not r:
                raise ObjectDoesNotExist
            return Response(r)
    except ObjectDoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET','POST'])
def show_user(request, id):
    try:
        SQL = "SELECT * FROM User WHERE userId = %s;"
        if request.method == 'GET':
            cursor = connection.cursor()
            data = request.data
            cursor.execute(SQL, [id])
            r = dictfetchall(cursor)
            if not r:
                raise ObjectDoesNotExist
            return Response(r)
        # elif request.method == 'POST':
        #     serializer = FoodSerializer(data=request.data)
        #     serializer.is_valid(raise_exception=True)
        #     data=serializer.validated_data
        #     cursor = connection.cursor()
        #     cursor.execute("INSERT INTO Food VALUES(%s, %s, %s, %s, %s)", [data['foodid'], data['foodname'], data['fat'], data['protein'], data['carb']]) 
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET', 'POST'])
def recipes(request,id):
    SQL_GET =   """
                SELECT recipeId, SUM(fat * weight) AS total_fat, SUM(protein * weight) AS total_protein, SUM(carb * weight) AS total_carb
                FROM createRecipe NATURAL JOIN Recipe NATURAL JOIN UseFood NATURAL JOIN Food
                WHERE userId = %s
                GROUP BY recipeId
                """
    SQL_POST = "CALL CreateNewRecipe(%s, %s, %s);"
    try:
        if request.method == 'GET':
            cursor = connection.cursor()
            data = request.data
            cursor.execute(SQL_GET, [id])
            r = dictfetchall(cursor)
            if not r:
                raise ObjectDoesNotExist
            return Response(r)            
        elif request.method == 'POST':
            print(request.data)
            cursor = connection.cursor()
            data = request.data
            json_file = data["foodWeights"]
            cursor.execute(SQL_POST, [id, data["recipeName"], json.dumps(json_file)])
            return Response(status=status.HTTP_201_CREATED)
    except ObjectDoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

