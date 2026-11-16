#include <iostream>

int main() {
    int x;
    int y;
    int sum;

    std::cout << "Enter x value: ";
    std::cin >> x;

    std::cout << "Enter y value: ";
    std::cin >> y;

    sum = x + y;

    std::cout << "The value of x and value combined is: " << sum << std::endl;
    return 0;
}