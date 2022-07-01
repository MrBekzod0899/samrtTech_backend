//************ 3.2-misol *************\\

#include <iostream>
#include <math.h>
using namespace std;
int main()
{
    float R,P=1;
   
    
    for(float R=1; R<=17; R+=1){
        P*=(R+17)/(2*pow(R,2)+9);
    }
    cout<<endl<<"Result: P="<<P;
    return 0;
}
