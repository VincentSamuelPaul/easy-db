from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from sqlalchemy import JSON
from torch import constant_pad_nd
from .models import Login
from django.contrib.auth import authenticate
import random
from databases.db import initdb, runSqlQuery

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/login',
    ]
    return Response(routes)


@api_view(['POST'])
def login(request):
    if Login.objects.filter(api_id=request.data['id']).values_list() and authenticate(username=request.data['name'], password=request.data['password']):
        return Response(request.data)
    else:
        return Response({'message':'Invalid Credentials...'})


def getApiKey():
    ran = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 
    'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 
    'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    api_key = ''
    for i in range(15):
        x = random.choice(ran)
        api_key += x
    if Login.objects.filter(api_id=api_key).values_list('api_id'):
        getApiKey()
    else:
        return api_key
    return Login.objects.filter(api_id=id).values_list('api_id')


@api_view(['POST'])
def register(request):
    if User.objects.filter(username=request.data['name']):
        return Response({'message':f"@{request.data['name']} is already in use"})
    if request.data['name'] == '' or len(request.data['name']) < 8:
        return Response({'message':"Username can't be null and less than 8 characters"})
    if len(request.data['password']) < 8:
        return Response({'message':"Password must be more than 8 characters"})
    if request.data['email'] == '':
        return Response({'message':"Enter a valid email to receive API key"})
    else:
        user = User.objects.create_user(request.data['name'], request.data['email'], request.data['password'])
        user.save()
        userid = User.objects.get(username=request.data['name'])
        loginUser = Login.objects.create(api_id=getApiKey(), user=userid)
        loginUser.save()
        initdb(request.data['name'])
        return Response({'name':request.data['name']})


@api_view(['POST'])
def runQuery(request):
    if request.data['name'] == User.objects.filter(username=request.data['name']).values('username')[0]['username']:
        data = runSqlQuery(request.data['query'], request.data['name'])
        if data:
            return Response(data)
        else:
            return Response({'message':'Query Executed'})
    else:
        return Response({'message':'Invalid Query...'})