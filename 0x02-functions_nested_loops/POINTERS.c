#include <stdio.h>

int main(void)
{
 int A[5];
 char B[] ={'d','c','#'};
 char s = "Hello world";
 int size = sizeof(A)/sizeof(A[0]);
 int sizeB = sizeof(B) / sizeof(B[0]);

 printf("Size of int is %d\n",sizeof(A[0]));
 printf("size of the Array is %d\n",size);
 printf("size of the B Array is %d\n",sizeB);
}
