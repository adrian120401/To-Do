package com.ToDo.easyTask;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Objects;

@SpringBootApplication
public class EasyTaskApplication {
	public static void main(String[] args) throws IOException {

		if (FirebaseApp.getApps().isEmpty()) {
			ClassLoader classLoader = EasyTaskApplication.class.getClassLoader();

			File file = new File(Objects.requireNonNull(classLoader.getResource("serviceAccountKey.json")).getFile());

			FileInputStream serviceAccount = new FileInputStream(file.getAbsolutePath());

			FirebaseOptions options = new FirebaseOptions.Builder()
					.setCredentials(GoogleCredentials.fromStream(serviceAccount))
					.setDatabaseUrl("https://to-do-66fa1-default-rtdb.firebaseio.com")
					.build();

			FirebaseApp.initializeApp(options);
		}


		SpringApplication.run(EasyTaskApplication.class, args);

	}

}
