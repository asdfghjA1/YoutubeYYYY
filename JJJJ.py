import pyautogui
from time import sleep
reloaded = 171
while True:
    pyautogui.hotkey('command' , 'r')  # click the mouse
    sleep(15)
    print(f"u have probably {reloaded} views :) ")
    reloaded += 1
