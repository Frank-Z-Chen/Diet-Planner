from rest_framework import serializers
from planner.models import *
# class FoodSerializer(serializers.Serializer):
#     foodid = serializers.IntegerField() 
#     foodname = serializers.CharField(max_length=30) 
#     fat = serializers.FloatField()
#     protein = serializers.FloatField()
#     carb = serializers.FloatField()
class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ['foodid', 'foodname', 'fat', 'protein', 'carb']
