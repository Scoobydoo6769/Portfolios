hull = int(input("Enter your Hull integrity percentage: "))
oxygen = int(input("Enter your Oxygen level percentage: "))
fuel = int(input("Enter your fuel reserve percentage: "))

if hull > 100 or oxygen > 100 or fuel > 100 or hull < 0 or oxygen < 0 or fuel < 0:
    print("Invalid percentage")
elif fuel < 15 and hull >= 30:
    print("FUEL CONSERVATION PROTOCOL")
    response = int(input("Do you want to (1) jettison cargo to save fuel, or (2) attempt a planetary slingshot maneuver: "))
    if response == 1:
        print("jettison cargo to save fuel option begin.")
    else:
        print("Attempt a planetary slingshot maneuver option begin.")
elif hull < 30 or oxygen < 20:
    print("IMMEDIATE EVACUATION PROTOCOL")
else:
    print("The space ship is safe to proceed with normal landing.")