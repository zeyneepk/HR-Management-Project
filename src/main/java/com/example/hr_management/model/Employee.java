package com.example.hr_management.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "employees", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
@NoArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    @Email(message = "Please provide a valid email address.")
    private String email;

    private int department;

    @Min(value = 0, message = "İzin günleri negatif olamaz.")
    private int leaveDays = 15;

    private String password;

}
