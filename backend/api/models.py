from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Login(models.Model):
    api_id = models.CharField(max_length=20)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.api_id