package com.example;

import java.util.ArrayList;
import java.util.List;

public class MockLeakingApplication {

    static List<byte[]> memoryLeak = new ArrayList<>();

    public static void main(String[] args) throws Exception {

        System.out.println("Mock Leak Application Started");

        while (true) {

            byte[] data = new byte[1024 * 1024]; // 1 MB

            memoryLeak.add(data);

            System.out.println(
                    "Allocated MB: " + memoryLeak.size());

            Thread.sleep(1000);
        }
    }
}