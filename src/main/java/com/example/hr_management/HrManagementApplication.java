package com.example.hr_management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class HrManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(HrManagementApplication.class, args);
	}

}
