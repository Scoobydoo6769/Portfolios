first_routine = input("Enter first routine: ")
while first_routine == "":
    print("You didn't enter the first routine: ")
    first_routine = input("Enter the first routine: ")

firstRoutine_time = input("Enter first routine time: ")
while firstRoutine_time == "":
    print("You didn't enter the first routine time")
    firstRoutine_time = input("Enter first routine time: ")

print(f"First routine: {firstRoutine_time} {first_routine}")

second_routine = input("Enter second routine: ")
while second_routine == "":
    print("You didn't enter the second routine: ")
    second_routine = input("Enter the second routine: ")

secondRoutine_time = input("Enter second routine time: ")
while secondRoutine_time == "":
    print("You didn't enter the seconds routine time")
    secondRoutine_time = input("Enter seconds rountine time: ")

print(f"First routine: {secondRoutine_time} {second_routine}")

third_routine = input("Enter third routine: ")
while third_routine == "":
    print("You didn't enter the third routine: ")
    third_routine = input("Enter the third routine: ")

thirdRoutine_time = input("Enter third routine time: ")
while thirdRoutine_time == "":
    print("You didn't enter the third routine time")
    thirdRoutine_time = input("Enter third routine time: ")

print(f"Third routine: {thirdRoutine_time} {third_routine}")

print(f"The summary of today's routine is:")
print(f"{firstRoutine_time} {first_routine}")
print(f"{secondRoutine_time} {second_routine}")
print(f"{thirdRoutine_time} {third_routine}")