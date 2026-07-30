const defaultCode = {

  c: `#include <stdio.h>

int main()
{
    printf("Hello AlgoArena");
    return 0;
}`,

  cpp: `#include <iostream>

using namespace std;

int main()
{
    cout << "Hello AlgoArena!";
    return 0;
}`,

  java: `public class Main {

    public static void main(String[] args) {

        System.out.println("Hello AlgoArena");

    }

}`,

  python: `print("Hello AlgoArena")`,

  javascript: `console.log("Hello AlgoArena");`,

  csharp: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello AlgoArena");
    }
}`
};

export default defaultCode;