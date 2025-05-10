package com.project.TaskManagerService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class TaskManagerServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskManagerServiceApplication.class, args);
	}

}
