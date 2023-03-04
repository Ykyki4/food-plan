from django.shortcuts import render

def index(request, id=1):
    return render(request, 'index.html')
