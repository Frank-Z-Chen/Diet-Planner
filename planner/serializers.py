from rest_framework import serializers

class FoodSerializer(serializers.Serializer):
    foodid = serializers.IntegerField() 
    foodname = serializers.CharField(max_length=30) 
    fat = serializers.FloatField()
    protein = serializers.FloatField()
    carb = serializers.FloatField()