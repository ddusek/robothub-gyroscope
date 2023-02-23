import robothub_depthai
import robothub
import datetime

def callback(packet):
    for imu_data in packet.data:
        robothub.COMMUNICATOR.notify(
            key='rhSchema/number',
            payload={'id': 'gyroscope-xyz', 'value': {'x': imu_data.acceleroMeter.x, 'y': imu_data.acceleroMeter.y, 'z': imu_data.acceleroMeter.z}}
        )


class ExampleApplication(robothub_depthai.RobotHubApplication):

    def on_start(self):
        for camera in self.unbooted_cameras:
            print('oakCamera start')
            imu = camera.oak_camera.create_imu()
            imu.config_imu(report_rate=1, batch_report_threshold=1, max_batch_reports=5)
            
            camera.oak_camera.callback(imu.out.main, callback=callback)