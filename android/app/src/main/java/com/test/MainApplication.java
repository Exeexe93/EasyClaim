package com.test;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.chirag.RNMail.RNMail;
import com.rnfs.RNFSPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;
import org.reactnative.camera.RNCameraPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.fetchsky.RNTextDetector.RNTextDetectorPackage;
import com.mlkit.RNMlKitPackage;
import com.imagepicker.ImagePickerPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new RNMail(),
                    new RNFSPackage(),
                    new RNFirebasePackage(),
                    new RNCameraPackage(),
                    new RNGestureHandlerPackage(),
                    new VectorIconsPackage(),
                    new RNTextDetectorPackage(),
                    new RNMlKitPackage(),
                    new RNFirebaseAuthPackage(),
                    new RNFirebaseDatabasePackage(),
                    new RNFirebaseStoragePackage(),
                    new ImagePickerPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
