package com.kenzie.appserver.service;

import com.kenzie.appserver.repositories.DoctorRepository;
import com.kenzie.appserver.repositories.model.DoctorRecord;
import com.kenzie.appserver.service.model.Doctor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DoctorService {
        private DoctorRepository doctorRepository;

        public DoctorService(DoctorRepository doctorRepository) {
            this.doctorRepository = doctorRepository;
        }

        public Doctor findById(String doctorId) {
            Doctor doctorBeingRetrieved = doctorRepository
                    .findById(doctorId)
                    .map(doctor -> new Doctor(doctor.getName(), doctor.getDob(), doctor.isActive()))
                    .orElse(null);

            return doctorBeingRetrieved;
        }

        public Doctor addNewDoctor(Doctor doctor) {
            DoctorRecord doctorRecord = new DoctorRecord();
            doctorRecord.setDoctorId(doctorRecord.getDoctorId());
            doctorRecord.setName(doctor.getName());
            doctorRecord.setDob(doctor.getDob());
            doctorRecord.setActive(doctor.isActive());
            doctorRepository.save(doctorRecord);
            return doctor;
        }

        public void removeDoctor(Doctor doctor){
            doctorRepository.deleteById(doctor.getDoctorId());
        }

    public void updateDoctor(Doctor doctor) {
        if (doctorRepository.existsById(doctor.getDoctorId())) {
            DoctorRecord doctorRecord = new DoctorRecord();
            doctorRecord.setActive(doctor.isActive());
            doctorRecord.setDob(doctor.getDob());
            doctorRecord.setDoctorId(doctor.getDoctorId());
            doctorRecord.setName(doctor.getName());

            doctorRepository.save(doctorRecord);
        }

    }
}
