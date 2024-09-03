package com.example.hr_management.model;

import jakarta.validation.constraints.*;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String department;

    @Min(value = 0, message = "İzin günleri negatif olamaz.")
    private int leaveDays = 15;

    private String password;
}
