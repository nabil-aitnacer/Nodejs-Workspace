#include <stdio.h>

int main(void)
{
print_triangle(3);
putchar('\n');
print_triangle(9);
putchar('\n');
print_triangle(98);


}

void print_triangle(int size)
{
        int i, y, z;

        if (size <= 0)
        {
                putchar('\n');
                return;

        }

        for (i = 1; i <= size; i++)
        {
                for (y = 1; y <= size - i ; y++)
                {
                        putchar(' ');
                }

                for (z = 1; z <= i ; z++)
                {
                        putchar('#');
                }
                putchar('\n');
        }
}
